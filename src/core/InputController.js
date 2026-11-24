const GAME_KEYS = new Set([
  'KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight',
  'ShiftLeft','ShiftRight','Space','KeyE','KeyQ','KeyF','KeyR','KeyI','KeyM','KeyB','KeyV',
  'Digit1','Digit2','Digit3','Escape'
]);

const MOVE_ALIASES = {
  ArrowUp: 'KeyW', ArrowDown: 'KeyS', ArrowLeft: 'KeyA', ArrowRight: 'KeyD'
};

const EDITABLE = 'input, textarea, select, [contenteditable="true"], [role="textbox"]';

export function createInputController({ state, canvas, getCamera, callbacks }) {
  let installed = false;
  let hadPointerLock = false;

  const isEditing = target => !!target?.closest?.(EDITABLE);
  const isGamePlayable = () => state.active && !state.paused && !state.uiOpen;

  function clearMovement() {
    state.keys ||= {};
    for (const key of ['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight','Space']) {
      state.keys[key] = false;
    }
  }

  function requestLock() {
    if (!state.active || state.paused || state.uiOpen || !canvas?.requestPointerLock) return;
    try {
      canvas.focus({ preventScroll: true });
      const result = canvas.requestPointerLock();
      if (result && typeof result.catch === 'function') result.catch(() => {});
    } catch (_) {
      // Keyboard movement remains available when pointer lock is blocked by the browser.
    }
  }

  function pauseFromEscape() {
    clearMovement();
    callbacks.pause?.();
  }

  function handleEscape(event) {
    event.preventDefault();
    event.stopPropagation();

    if (state.buildMode) {
      clearMovement();
      callbacks.escapeBuild?.();
      return true;
    }

    if (state.uiOpen) {
      clearMovement();
      callbacks.closeOverlay?.();
      return true;
    }

    const pauseVisible = !document.querySelector('#pause-screen')?.classList.contains('hidden');
    if (pauseVisible) {
      callbacks.resume?.();
      return true;
    }

    const settingsVisible = !document.querySelector('#settings-screen')?.classList.contains('hidden');
    const savesVisible = !document.querySelector('#save-screen')?.classList.contains('hidden');
    if (settingsVisible || savesVisible) {
      callbacks.closeScreen?.();
      return true;
    }

    if (!state.active && !document.querySelector('#creator')?.classList.contains('hidden')) {
      callbacks.returnCreator?.();
      return true;
    }

    if (state.active && !state.paused) {
      pauseFromEscape();
      return true;
    }
    return false;
  }

  function handleAction(code) {
    switch (code) {
      case 'KeyE': callbacks.interact?.(); return true;
      case 'KeyQ': callbacks.useQuickSlot?.(); return true;
      case 'KeyI': callbacks.toggleInventory?.(); return true;
      case 'KeyM': callbacks.toggleMap?.(); return true;
      case 'KeyB': callbacks.openBuild?.(); return true;
      case 'KeyR': callbacks.inspectItem?.(); return true;
      case 'KeyF': callbacks.toggleFlashlight?.(); return true;
      case 'KeyV': callbacks.toggleCamera?.(); return true;
      case 'Digit1': state.selectedSlot = 0; callbacks.updateQuickbar?.(); return true;
      case 'Digit2': state.selectedSlot = 1; callbacks.updateQuickbar?.(); return true;
      case 'Digit3': state.selectedSlot = 2; callbacks.updateQuickbar?.(); return true;
      case 'Space':
        if (state.onGround) {
          state.velY = 6.2;
          state.onGround = false;
          state.jumpStart = state.player.y;
        }
        return true;
      default: return false;
    }
  }

  function onKeyDown(event) {
    if (event.isComposing || isEditing(event.target)) return;
    const code = event.code || '';

    if (code === 'Escape') {
      handleEscape(event);
      return;
    }

    if (!GAME_KEYS.has(code) || !isGamePlayable()) return;

    const normalized = MOVE_ALIASES[code] || code;
    state.keys ||= {};
    state.keys[normalized] = true;
    if (normalized !== code) state.keys[code] = true;

    if (['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(code)) event.preventDefault();
    if (event.repeat) return;

    if (handleAction(code)) event.preventDefault();
  }

  function onKeyUp(event) {
    const code = event.code || '';
    const normalized = MOVE_ALIASES[code] || code;
    if (state.keys) {
      state.keys[normalized] = false;
      state.keys[code] = false;
    }
  }

  function onMouseMove(event) {
    if (document.pointerLockElement !== canvas || !isGamePlayable()) return;
    callbacks.onLook?.(event.movementX || 0, event.movementY || 0);
  }

  function onPointerLockChange() {
    const locked = document.pointerLockElement === canvas;
    if (locked) {
      hadPointerLock = true;
      state.paused = false;
      canvas.focus({ preventScroll: true });
      return;
    }

    clearMovement();
    if (hadPointerLock && state.active && !state.paused && !state.uiOpen && !document.hidden) {
      callbacks.pause?.();
    }
    hadPointerLock = false;
  }

  function onWindowBlur() { clearMovement(); }
  function onVisibilityChange() { if (document.hidden) clearMovement(); }

  function install() {
    if (installed) return;
    installed = true;
    canvas.tabIndex = 0;
    canvas.style.touchAction = 'none';
    window.addEventListener('keydown', onKeyDown, { capture: true });
    window.addEventListener('keyup', onKeyUp, { capture: true });
    window.addEventListener('blur', onWindowBlur);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('visibilitychange', onVisibilityChange);
    document.addEventListener('pointerlockchange', onPointerLockChange);
  }

  function destroy() {
    if (!installed) return;
    window.removeEventListener('keydown', onKeyDown, true);
    window.removeEventListener('keyup', onKeyUp, true);
    window.removeEventListener('blur', onWindowBlur);
    window.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    document.removeEventListener('pointerlockchange', onPointerLockChange);
    clearMovement();
    installed = false;
  }

  return { install, destroy, requestLock, clearMovement };
}
