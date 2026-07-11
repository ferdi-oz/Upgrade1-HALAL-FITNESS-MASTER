export class BarcodeValidator {

  static normalize(barcode: string): string {
    return barcode.replace(/\D/g, "");
  }

  static isValidEAN13(barcode: string): boolean {

    barcode = this.normalize(barcode);

    if (barcode.length !== 13) {
      return false;
    }

    if (!/^\d{13}$/.test(barcode)) {
      return false;
    }

    let sum = 0;

    for (let i = 0; i < 12; i++) {

      const digit = Number(barcode[i]);

      sum += i % 2 === 0
        ? digit
        : digit * 3;
    }

    const checksum =
      (10 - (sum % 10)) % 10;

    return checksum === Number(barcode[12]);
  }

}
