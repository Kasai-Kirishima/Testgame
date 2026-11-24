/** Local, version-tolerant save storage. Old direct-JSON saves remain readable. */
export class SaveRepository {
  constructor(storage) {
    try { this.storage = storage || globalThis.localStorage; }
    catch (_) { this.storage = null; }
    this.savePrefix = 'quiet-dream-save-';
    this.autoKey = 'quiet-dream-autosave';
  }

  keyFor(slot) {
    return slot === 'auto' ? this.autoKey : `${this.savePrefix}${Number(slot)}`;
  }

  read(slot) {
    if (!this.storage) return null;
    try {
      const primaryKey = this.keyFor(slot);
      // v0.7 and earlier wrote autosaves into the numbered-slot namespace.
      const raw = this.storage.getItem(primaryKey)
        ?? (slot === 'auto' ? this.storage.getItem(`${this.savePrefix}auto`) : null);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const data = parsed?.payload && typeof parsed.payload === 'object' ? parsed.payload : parsed;
      return data && typeof data === 'object' && data.player ? data : null;
    } catch (error) {
      console.warn('Save read failed:', error);
      return null;
    }
  }

  write(slot, data) {
    if (!this.storage) throw new Error('Browser storage is unavailable');
    if (!data || typeof data !== 'object' || !data.player) throw new TypeError('Invalid save data');
    const safeData = { ...data, version: Math.max(3, Number(data.version) || 0), savedAt: Date.now() };
    this.storage.setItem(this.keyFor(slot), JSON.stringify(safeData));
    if (slot === 'auto') {
      try { this.storage.removeItem(`${this.savePrefix}auto`); } catch (_) { /* best-effort migration */ }
    }
    return safeData;
  }

  remove(slot) {
    if (this.storage) this.storage.removeItem(this.keyFor(slot));
  }

  list() {
    return [
      { id: 'auto', title: 'Автосохранение', data: this.read('auto') },
      ...[0,1,2].map(id => ({ id, title: `Сохранение ${id + 1}`, data: this.read(id) }))
    ];
  }
}
