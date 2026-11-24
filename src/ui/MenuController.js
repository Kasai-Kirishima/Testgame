const FOCUSABLE = 'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [href], [tabindex]:not([tabindex="-1"])';

export function createMenuController({ onScreenChanged = () => {} } = {}) {
  let observer = null;
  let installed = false;

  function currentScreen() {
    return [...document.querySelectorAll('.screen')].find(screen => !screen.classList.contains('hidden')) || null;
  }

  function visibleFocusable(screen = currentScreen()) {
    if (!screen) return [];
    return [...screen.querySelectorAll(FOCUSABLE)].filter(el => {
      const style = getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden' && el.getClientRects().length > 0;
    });
  }

  function focusInitial(screen = currentScreen()) {
    if (!screen) return;
    const target = visibleFocusable(screen).find(el => !el.matches('.disabled'));
    if (target && !screen.contains(document.activeElement)) target.focus({ preventScroll: true });
    onScreenChanged(screen);
  }

  function onKeyDown(event) {
    if (event.isComposing) return;
    const screen = currentScreen();
    if (!screen) return;

    if (event.code === 'Escape') {
      if (screen.id === 'creator') {
        event.preventDefault();
        const appearance = screen.querySelector('#appearance-step');
        if (appearance && !appearance.classList.contains('hidden')) screen.querySelector('#back-traits')?.click();
        else screen.querySelector('#creator-back')?.click();
      } else if (screen.id === 'settings-screen' || screen.id === 'save-screen') {
        event.preventDefault();
        screen.querySelector('[data-close]')?.click();
      }
      return;
    }

    if (!['ArrowDown','ArrowUp'].includes(event.code)) return;
    const focused = document.activeElement;
    if (focused && focused.matches('input,select,textarea,[contenteditable="true"]')) return;

    const elements = visibleFocusable(screen);
    if (!elements.length) return;
    const currentIndex = elements.indexOf(focused);
    const direction = event.code === 'ArrowDown' ? 1 : -1;
    const nextIndex = currentIndex < 0
      ? (direction > 0 ? 0 : elements.length - 1)
      : (currentIndex + direction + elements.length) % elements.length;
    elements[nextIndex].focus({ preventScroll: true });
    event.preventDefault();
  }

  function install() {
    if (installed) return;
    installed = true;
    document.addEventListener('keydown', onKeyDown);
    observer = new MutationObserver(() => {
      const screen = currentScreen();
      if (screen && screen.dataset.focusedScreen !== 'true') {
        document.querySelectorAll('.screen').forEach(item => delete item.dataset.focusedScreen);
        screen.dataset.focusedScreen = 'true';
        queueMicrotask(() => focusInitial(screen));
      }
    });
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
    focusInitial();
  }

  function destroy() {
    if (!installed) return;
    document.removeEventListener('keydown', onKeyDown);
    observer?.disconnect();
    observer = null;
    installed = false;
  }

  return { install, destroy, focusInitial, visibleFocusable };
}
