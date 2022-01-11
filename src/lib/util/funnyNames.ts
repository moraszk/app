const NAMES = [
  ['Cserép', 'Virág'],
  ['Békés', 'Csaba'],
  ['Gipsz', 'Elek'],
  ['Git', 'Áron'],
  ['Hú', 'Zóra'],
  ['Kispál', 'Inka'],
  ['Pop', 'Simon'],
  ['Ria', 'Dóra'],
  ['Vak', 'Cina'],
  ['Fütty', 'Imre'],
  ['Fikusz', 'Kukisz'],
  ['Tök', 'Ödön'],
  ['Szalmon', 'Ella'],
  ['Para', 'Zita'],
  ['Kala', 'Pál'],
  ['Garga', 'Liza'],
];

class FunnyNames {
  private names: string[][] = [];
  constructor() {
    this.refill();
  }
  refill() {
    this.names = [...NAMES.sort(() => Math.random() - 0.5)];
  }
  next(): string[] {
    if (this.names.length === 0) {
      this.refill();
    }
    return this.names.pop() as string[];
  }
}
export default FunnyNames;
