function jeVstupSpravny(idVstup, idError) {
  const hodnota = $(idVstup).val();

  if (hodnota === "") {
    $(idError).text("Nezadane udaje");
    $(idVstup).addClass("chybny-vstup");
    return false;
  }

  if (isNaN(hodnota) === true) {
    $(idError).text("Chybne zadane udaje");
    $(idVstup).addClass("chybny-vstup");
    return false;
  }

  if (hodnota < 0) {
    $(idError).text("Zadana zaporna hodnota");
    $(idVstup).addClass("chybny-vstup");
    return false;
  }

  $(idError).text("");
  $(idVstup).removeClass("chybny-vstup");
  return true;
}

/**POHONNE LATKY =========================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - pohonne hmotne latky
 * - spotreba vozidla
 * @returns naklady na pohonne latky
 */

function PohonneLatky() {
  const ID_ROCNA_JAZDA = "#idVypocitanyPHL";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyPHLjednotkove";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatPHL = jeVstupSpravny("#idPHL", "#idErrorPHL");
  const jeMozneVypocitatSV = jeVstupSpravny("#idSV", "#idErrorSV");

  if (
    jeMozneVypocitatRJV === false ||
    jeMozneVypocitatPHL === false ||
    jeMozneVypocitatSV === false
  ) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const PHL = parseFloat($("#idPHL").val());
  const SV = parseFloat($("#idSV").val());

  // vzorce na vypocet vysledku
  const vysledokRocny = parseFloat((SV * PHL * RJV) / 100);
  const vysledokJednotkovy = parseFloat(vysledokRocny / RJV);

  // zapisanie vysledku
  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocny * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(Math.round(vysledokJednotkovy * 10000) / 10000);
}

/**MOTOROVY OLEJ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - cena motoroveho oleja
 * - objem motoroveho oleja
 * - zivotnost motoroveho oleja
 * - spotreba motoroveho oleja
 * @returns naklady na motorovy olej
 */

function MotorovyOlej() {
  const ID_ROCNA_JAZDA = "#idVypocitanyMO";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyMOjednotkove";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatCMO = jeVstupSpravny("#idCMO", "#idErrorCMO");
  const jeMozneVypocitatOMO = jeVstupSpravny("#idOMO", "#idErrorOMO");
  const jeMozneVypocitatZMO = jeVstupSpravny("#idZMO", "#idErrorZMO");
  const jeMozneVypocitatSMO = jeVstupSpravny("#idSMO", "#idErrorSMO");

  if (
    jeMozneVypocitatRJV === false ||
    jeMozneVypocitatCMO === false ||
    jeMozneVypocitatOMO === false ||
    jeMozneVypocitatZMO === false ||
    jeMozneVypocitatSMO === false
  ) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const CMO = parseFloat($("#idCMO").val());
  const OMO = parseFloat($("#idOMO").val());
  const ZMO = parseFloat($("#idZMO").val());
  const SMO = parseFloat($("#idSMO").val());

  // vzorce na vypocet vysledku
  const vysledokRocny = parseFloat(
    (SMO * CMO * RJV) / 10000 + (OMO * CMO * RJV) / ZMO
  );
  const vysledokJednotkovy = parseFloat(vysledokRocny / RJV);

  // zapisanie vysledku
  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocny * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(Math.round(vysledokJednotkovy * 10000) / 10000);
}

/**PREVODOVY OLEJ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - cena prevodoveho oleja
 * - objem prevodoveho oleja
 * - zivotnost prevodovky
 * - zivotnost diferencialu
 * - spotreba prevodoveho oleja
 * @returns naklady na prevodovy olej
 */
function PrevodovyOlej() {
  const ID_ROCNA_JAZDA = "#idVypocitanyPO";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyPOjednotkove";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatZP = jeVstupSpravny("#idZP", "#idErrorZP");
  const jeMozneVypocitatZD = jeVstupSpravny("#idZD", "#idErrorZD");
  const jeMozneVypocitatSPO = jeVstupSpravny("#idSPO", "#idErrorSPO");
  const jeMozneVypocitatOPO = jeVstupSpravny("#idOPO", "#idErrorOPO");
  const jeMozneVypocitatCPO = jeVstupSpravny("#idCPO", "#idErrorCPO");

  if (
    jeMozneVypocitatRJV === false ||
    jeMozneVypocitatZP === false ||
    jeMozneVypocitatZD === false ||
    jeMozneVypocitatOPO === false ||
    jeMozneVypocitatCPO === false ||
    jeMozneVypocitatSPO === false
  ) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const ZP = parseFloat($("#idZP").val());
  const ZD = parseFloat($("#idZD").val());
  const SPO = parseFloat($("#idSPO").val());
  const OPO = parseFloat($("#idOPO").val());
  const CPO = parseFloat($("#idCPO").val());

  // vzorce na vypocet vysledku
  const vysledokRocny = parseFloat(
    (SPO * CPO * RJV) / ZP + (OPO * CPO * RJV) / ZD
  );
  const vysledokJednotkovy = parseFloat(vysledokRocny / RJV);

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocny * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(Math.round(vysledokJednotkovy * 10000) / 10000);
}

/**PNEUMATIKY ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - pocet kusov pneumatik
 * - cena kusu pneumatiky
 * - zivotnost pneumatiky
 * @returns naklady na pneumatiky
 */
function Pneumatiky() {
  const ID_ROCNA_JAZDA = "#idVypocitanyPn";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyPnjednotkove";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatPKP = jeVstupSpravny("#idPKP", "#idErrorPKP");
  const jeMozneVypocitatCKP = jeVstupSpravny("#idCKP", "#idErrorCKP");
  const jeMozneVypocitatZPn = jeVstupSpravny("#idZPn", "#idErrorZPn");

  if (
    jeMozneVypocitatRJV === false ||
    jeMozneVypocitatPKP === false ||
    jeMozneVypocitatCKP === false ||
    jeMozneVypocitatZPn === false
  ) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const PKP = parseFloat($("#idPKP").val());
  const CKP = parseFloat($("#idCKP").val());
  const ZPn = parseFloat($("#idZPn").val());

  // vzorce na vypocet vysledku
  const vysledokRocny = parseFloat((PKP * CKP * RJV) / ZPn);
  const vysledokJednotkovy = parseFloat(vysledokRocny / RJV);

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocny * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(Math.round(vysledokJednotkovy * 10000) / 10000);
}

/**UDRZBA ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - naklady na udrzbu
 * @returns vyska nakladov na udrzbu
 */

function Udrzba() {
  const ID_ROCNA_JAZDA = "#idVypocitanyRNU";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyRNUjednotkove";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatRNU = jeVstupSpravny("#idRNU", "#idErrorRNU");

  if (jeMozneVypocitatRJV === false || jeMozneVypocitatRNU === false) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const RNU = parseFloat($("#idRNU").val());

  // vzorce na vypocet vysledku

  const vysledokRocny = parseFloat(RNU);
  const vysledokJednotkovy = parseFloat(vysledokRocny / RJV);

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocny * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(Math.round(vysledokJednotkovy * 10000) / 10000);
}

/**OPRAVY ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - naklady na opravy
 * @returns vyska nakladov na opravy
 */

function Opravy() {
  const ID_ROCNA_JAZDA = "#idVypocitanyRNO";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyRNOjednotkove";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatRNO = jeVstupSpravny("#idRNO", "#idErrorRNO");

  if (jeMozneVypocitatRJV === false || jeMozneVypocitatRNO === false) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const RNO = parseFloat($("#idRNO").val());

  // vzorce na vypocet vysledku

  const vysledokRocny = parseFloat(RNO);
  const vysledokJednotkovy = parseFloat(vysledokRocny / RJV);

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocny * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(Math.round(vysledokJednotkovy * 10000) / 10000);
}

/** MZDA OSADKY ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - prestoje za rok
 * - percento rocny jazdny vykon
 * - percento prestoje za rok
 * - mzdu osadky
 * @returns vyska nakladov na mzdu osadky
 */

function MzdaOsadky() {
  const ID_ROCNA_JAZDA = "#idVypocitanyMZD";
  const ID_ROCNY_PRESTOJ = "#idVypocitanyMZD2";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyMZDjednotkove";
  const ID_JEDNOTKOVY_PRESTOJ = "#idVypocitanyMZDjednotkove2";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatPZR = jeVstupSpravny("#idPZR", "#idErrorPZR");
  const jeMozneVypocitatPRJV = jeVstupSpravny("#idPRJV", "#idErrorPRJV");
  const jeMozneVypocitatPPZR = jeVstupSpravny("#idPPZR", "#idErrorPPZR");
  const jeMozneVypocitatMZD = jeVstupSpravny("#idMZD", "#idErrorMZD");

  if (
    jeMozneVypocitatRJV === false ||
    jeMozneVypocitatPZR === false ||
    jeMozneVypocitatPRJV === false ||
    jeMozneVypocitatPPZR === false ||
    jeMozneVypocitatMZD === false
  ) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const PZR = parseFloat($("#idPZR").val());
  const PRJV = parseFloat($("#idPRJV").val());
  const PPZR = parseFloat($("#idPPZR").val());
  const MZD = parseFloat($("#idMZD").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = parseFloat(MZD * PRJV);
  const vysledokRocnyPrestoj = parseFloat(MZD * PPZR);
  const vysledokJednotkovyJazda = parseFloat(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = parseFloat(vysledokRocnyPrestoj / PZR);

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocnyJazda * 100) / 100);
  $(ID_ROCNY_PRESTOJ).text(Math.round(vysledokRocnyPrestoj * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(
    Math.round(vysledokJednotkovyJazda * 10000) / 10000
  );
  $(ID_JEDNOTKOVY_PRESTOJ).text(
    Math.round(vysledokJednotkovyPrestoj * 10000) / 10000
  );
}

/** Povinne Zmluvne Poistenie ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - prestoje za rok
 * - percento rocny jazdny vykon
 * - percento prestoje za rok
 * - vysku PZP
 * @returns vyska nakladov na PZP
 */

function PovinneZmluvnePoistenie() {
  const ID_ROCNA_JAZDA = "#idVypocitanyPZP";
  const ID_ROCNY_PRESTOJ = "#idVypocitanyPZP2";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyPZPjednotkove";
  const ID_JEDNOTKOVY_PRESTOJ = "#idVypocitanyPZPjednotkove2";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatPZR = jeVstupSpravny("#idPZR", "#idErrorPZR");
  const jeMozneVypocitatPRJV = jeVstupSpravny("#idPRJV", "#idErrorPRJV");
  const jeMozneVypocitatPPZR = jeVstupSpravny("#idPPZR", "#idErrorPPZR");
  const jeMozneVypocitatPZP = jeVstupSpravny("#idPZP", "#idErrorPZP");

  if (
    jeMozneVypocitatRJV === false ||
    jeMozneVypocitatPZR === false ||
    jeMozneVypocitatPRJV === false ||
    jeMozneVypocitatPPZR === false ||
    jeMozneVypocitatPZP === false
  ) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const PZR = parseFloat($("#idPZR").val());
  const PRJV = parseFloat($("#idPRJV").val());
  const PPZR = parseFloat($("#idPPZR").val());
  const PZP = parseFloat($("#idPZP").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = parseFloat(PZP * PRJV);
  const vysledokRocnyPrestoj = parseFloat(PZP * PPZR);
  const vysledokJednotkovyJazda = parseFloat(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = parseFloat(vysledokRocnyPrestoj / PZR);

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocnyJazda * 100) / 100);
  $(ID_ROCNY_PRESTOJ).text(Math.round(vysledokRocnyPrestoj * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(
    Math.round(vysledokJednotkovyJazda * 10000) / 10000
  );
  $(ID_JEDNOTKOVY_PRESTOJ).text(
    Math.round(vysledokJednotkovyPrestoj * 10000) / 10000
  );
}

/** Dan z Motoroveho Vozidla ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - prestoje za rok
 * - percento rocny jazdny vykon
 * - percento prestoje za rok
 * - vysku dane z motoroveho vozidla
 * @returns vyska nakladov na dane z motoroveho vozidla
 */

function DanMotorovehoVozidla() {
  const ID_ROCNA_JAZDA = "#idVypocitanyDMV";
  const ID_ROCNY_PRESTOJ = "#idVypocitanyDMV2";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyDMVjednotkove";
  const ID_JEDNOTKOVY_PRESTOJ = "#idVypocitanyDMVjednotkove2";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatPZR = jeVstupSpravny("#idPZR", "#idErrorPZR");
  const jeMozneVypocitatPRJV = jeVstupSpravny("#idPRJV", "#idErrorPRJV");
  const jeMozneVypocitatPPZR = jeVstupSpravny("#idPPZR", "#idErrorPPZR");
  const jeMozneVypocitatDMV = jeVstupSpravny("#idDMV", "#idErrorDMV");

  if (
    jeMozneVypocitatRJV === false ||
    jeMozneVypocitatPZR === false ||
    jeMozneVypocitatPRJV === false ||
    jeMozneVypocitatPPZR === false ||
    jeMozneVypocitatDMV === false
  ) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const PZR = parseFloat($("#idPZR").val());
  const PRJV = parseFloat($("#idPRJV").val());
  const PPZR = parseFloat($("#idPPZR").val());
  const DMV = parseFloat($("#idDMV").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = parseFloat(DMV * PRJV);
  const vysledokRocnyPrestoj = parseFloat(DMV * PPZR);
  const vysledokJednotkovyJazda = parseFloat(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = parseFloat(vysledokRocnyPrestoj / PZR);

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocnyJazda * 100) / 100);
  $(ID_ROCNY_PRESTOJ).text(Math.round(vysledokRocnyPrestoj * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(
    Math.round(vysledokJednotkovyJazda * 10000) / 10000
  );
  $(ID_JEDNOTKOVY_PRESTOJ).text(
    Math.round(vysledokJednotkovyPrestoj * 10000) / 10000
  );
}

/** CMR poistenie ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - prestoje za rok
 * - percento rocny jazdny vykon
 * - percento prestoje za rok
 * - vysku CMR positenia
 * @returns vyska nakladov na CMR positenie
 */

function CMRPoistenie() {
  const ID_ROCNA_JAZDA = "#idVypocitanyCMR";
  const ID_ROCNY_PRESTOJ = "#idVypocitanyCMR2";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyCMRjednotkove";
  const ID_JEDNOTKOVY_PRESTOJ = "#idVypocitanyCMRjednotkove2";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatPZR = jeVstupSpravny("#idPZR", "#idErrorPZR");
  const jeMozneVypocitatPRJV = jeVstupSpravny("#idPRJV", "#idErrorPRJV");
  const jeMozneVypocitatPPZR = jeVstupSpravny("#idPPZR", "#idErrorPPZR");
  const jeMozneVypocitatCMR = jeVstupSpravny("#idCMR", "#idErrorCMR");

  if (
    jeMozneVypocitatRJV === false ||
    jeMozneVypocitatPZR === false ||
    jeMozneVypocitatPRJV === false ||
    jeMozneVypocitatPPZR === false ||
    jeMozneVypocitatCMR === false
  ) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const PZR = parseFloat($("#idPZR").val());
  const PRJV = parseFloat($("#idPRJV").val());
  const PPZR = parseFloat($("#idPPZR").val());
  const CMR = parseFloat($("#idCMR").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = parseFloat(CMR * PRJV);
  const vysledokRocnyPrestoj = parseFloat(CMR * PPZR);
  const vysledokJednotkovyJazda = parseFloat(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = parseFloat(vysledokRocnyPrestoj / PZR);

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocnyJazda * 100) / 100);
  $(ID_ROCNY_PRESTOJ).text(Math.round(vysledokRocnyPrestoj * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(
    Math.round(vysledokJednotkovyJazda * 10000) / 10000
  );
  $(ID_JEDNOTKOVY_PRESTOJ).text(
    Math.round(vysledokJednotkovyPrestoj * 10000) / 10000
  );
}

/** Havarijne poistenie ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - prestoje za rok
 * - percento rocny jazdny vykon
 * - percento prestoje za rok
 * - vyska havarijneho poistenia
 * @returns vyska nakladov na Havarijne poistenie
 */

function HavarijnePoistenie() {
  const ID_ROCNA_JAZDA = "#idVypocitanyHP";
  const ID_ROCNY_PRESTOJ = "#idVypocitanyHP2";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyHPjednotkove";
  const ID_JEDNOTKOVY_PRESTOJ = "#idVypocitanyHPjednotkove2";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatPZR = jeVstupSpravny("#idPZR", "#idErrorPZR");
  const jeMozneVypocitatPRJV = jeVstupSpravny("#idPRJV", "#idErrorPRJV");
  const jeMozneVypocitatPPZR = jeVstupSpravny("#idPPZR", "#idErrorPPZR");
  const jeMozneVypocitatHP = jeVstupSpravny("#idHP", "#idErrorHP");

  if (
    jeMozneVypocitatRJV === false ||
    jeMozneVypocitatPZR === false ||
    jeMozneVypocitatPRJV === false ||
    jeMozneVypocitatPPZR === false ||
    jeMozneVypocitatHP === false
  ) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const PZR = parseFloat($("#idPZR").val());
  const PRJV = parseFloat($("#idPRJV").val());
  const PPZR = parseFloat($("#idPPZR").val());
  const HP = parseFloat($("#idHP").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = parseFloat(HP * PRJV);
  const vysledokRocnyPrestoj = parseFloat(HP * PPZR);
  const vysledokJednotkovyJazda = parseFloat(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = parseFloat(vysledokRocnyPrestoj / PZR);

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocnyJazda * 100) / 100);
  $(ID_ROCNY_PRESTOJ).text(Math.round(vysledokRocnyPrestoj * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(
    Math.round(vysledokJednotkovyJazda * 10000) / 10000
  );
  $(ID_JEDNOTKOVY_PRESTOJ).text(
    Math.round(vysledokJednotkovyPrestoj * 10000) / 10000
  );
}

/** Rezijne naklady ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - prestoje za rok
 * - percento rocny jazdny vykon
 * - percento prestoje za rok
 * - vyska rezijnych nakladov
 * @returns vyska nakladov na rezijne naklady
 */

function RezijneNaklady() {
  const ID_ROCNA_JAZDA = "#idVypocitanyRN";
  const ID_ROCNY_PRESTOJ = "#idVypocitanyRN2";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyRNjednotkove";
  const ID_JEDNOTKOVY_PRESTOJ = "#idVypocitanyRNjednotkove2";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatPZR = jeVstupSpravny("#idPZR", "#idErrorPZR");
  const jeMozneVypocitatPRJV = jeVstupSpravny("#idPRJV", "#idErrorPRJV");
  const jeMozneVypocitatPPZR = jeVstupSpravny("#idPPZR", "#idErrorPPZR");
  const jeMozneVypocitatRN = jeVstupSpravny("#idRN", "#idErrorRN");

  if (
    jeMozneVypocitatRJV === false ||
    jeMozneVypocitatPZR === false ||
    jeMozneVypocitatPRJV === false ||
    jeMozneVypocitatPPZR === false ||
    jeMozneVypocitatRN === false
  ) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const PZR = parseFloat($("#idPZR").val());
  const PRJV = parseFloat($("#idPRJV").val());
  const PPZR = parseFloat($("#idPPZR").val());
  const RN = parseFloat($("#idRN").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = parseFloat(RN * PRJV);
  const vysledokRocnyPrestoj = parseFloat(RN * PPZR);
  const vysledokJednotkovyJazda = parseFloat(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = parseFloat(vysledokRocnyPrestoj / PZR);

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocnyJazda * 100) / 100);
  $(ID_ROCNY_PRESTOJ).text(Math.round(vysledokRocnyPrestoj * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(
    Math.round(vysledokJednotkovyJazda * 10000) / 10000
  );
  $(ID_JEDNOTKOVY_PRESTOJ).text(
    Math.round(vysledokJednotkovyPrestoj * 10000) / 10000
  );
}

/** Odpis ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - prestoje za rok
 * - percento rocny jazdny vykon
 * - percento prestoje za rok
 * - vyska odpisu
 * @returns vyska nakladov na odpis
 */

function Odpis() {
  const ID_ROCNA_JAZDA = "#idVypocitanyODP";
  const ID_ROCNY_PRESTOJ = "#idVypocitanyODP2";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyODPjednotkove";
  const ID_JEDNOTKOVY_PRESTOJ = "#idVypocitanyODPjednotkove2";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatPZR = jeVstupSpravny("#idPZR", "#idErrorPZR");
  const jeMozneVypocitatPRJV = jeVstupSpravny("#idPRJV", "#idErrorPRJV");
  const jeMozneVypocitatPPZR = jeVstupSpravny("#idPPZR", "#idErrorPPZR");
  const jeMozneVypocitatODP = jeVstupSpravny("#idODP", "#idErrorODP");

  if (
    jeMozneVypocitatRJV === false ||
    jeMozneVypocitatPZR === false ||
    jeMozneVypocitatPRJV === false ||
    jeMozneVypocitatPPZR === false ||
    jeMozneVypocitatODP === false
  ) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const PZR = parseFloat($("#idPZR").val());
  const PRJV = parseFloat($("#idPRJV").val());
  const PPZR = parseFloat($("#idPPZR").val());
  const ODP = parseFloat($("#idODP").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = parseFloat(ODP * PRJV);
  const vysledokRocnyPrestoj = parseFloat(ODP * PPZR);
  const vysledokJednotkovyJazda = parseFloat(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = parseFloat(vysledokRocnyPrestoj / PZR);

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocnyJazda * 100) / 100);
  $(ID_ROCNY_PRESTOJ).text(Math.round(vysledokRocnyPrestoj * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(
    Math.round(vysledokJednotkovyJazda * 10000) / 10000
  );
  $(ID_JEDNOTKOVY_PRESTOJ).text(
    Math.round(vysledokJednotkovyPrestoj * 10000) / 10000
  );
}

/** Diety ==============================================================================
 * Pre vypocet potrebujeme:
 * - rocny jazdny vykon
 * - prestoje za rok
 * - percento rocny jazdny vykon
 * - percento prestoje za rok
 * - vyska diet
 * @returns vyska nakladov na diety
 */

function Diety() {
  const ID_ROCNA_JAZDA = "#idVypocitanyVRD";
  const ID_ROCNY_PRESTOJ = "#idVypocitanyVRD2";
  const ID_JEDNOTKOVA_JAZDA = "#idVypocitanyVRDjednotkove";
  const ID_JEDNOTKOVY_PRESTOJ = "#idVypocitanyVRDjednotkove2";

  const jeMozneVypocitatRJV = jeVstupSpravny("#idRJV", "#idErrorRJV");
  const jeMozneVypocitatPZR = jeVstupSpravny("#idPZR", "#idErrorPZR");
  const jeMozneVypocitatPRJV = jeVstupSpravny("#idPRJV", "#idErrorPRJV");
  const jeMozneVypocitatPPZR = jeVstupSpravny("#idPPZR", "#idErrorPPZR");
  const jeMozneVypocitatVRD = jeVstupSpravny("#idVRD", "#idErrorVRD");

  if (
    jeMozneVypocitatRJV === false ||
    jeMozneVypocitatPZR === false ||
    jeMozneVypocitatPRJV === false ||
    jeMozneVypocitatPPZR === false ||
    jeMozneVypocitatVRD === false
  ) {
    $(ID_ROCNA_JAZDA).val("");
    $(ID_JEDNOTKOVA_JAZDA).val("");
    return;
  }

  const RJV = parseFloat($("#idRJV").val());
  const PZR = parseFloat($("#idPZR").val());
  const PRJV = parseFloat($("#idPRJV").val());
  const PPZR = parseFloat($("#idPPZR").val());
  const VRD = parseFloat($("#idVRD").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = parseFloat(VRD * PRJV);
  const vysledokRocnyPrestoj = parseFloat(VRD * PPZR);
  const vysledokJednotkovyJazda = parseFloat(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = parseFloat(vysledokRocnyPrestoj / PZR);

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocnyJazda * 100) / 100);
  $(ID_ROCNY_PRESTOJ).text(Math.round(vysledokRocnyPrestoj * 100) / 100);
  $(ID_JEDNOTKOVA_JAZDA).text(
    Math.round(vysledokJednotkovyJazda * 10000) / 10000
  );
  $(ID_JEDNOTKOVY_PRESTOJ).text(
    Math.round(vysledokJednotkovyPrestoj * 10000) / 10000
  );
}

/** Rocne naklady na jazdu spolu ==============================================================================
 * Pre vypocet potrebujeme:
 * - vysledky rocnych fixnych a rocnych variabilnych nakladov na jazdu
 * @returns vyska rocnych fixnych a rocnych variabilnych nakladov na jazdu spolu
 */

function RocnaJazdaSpolu() {
  const ID_ROCNA_JAZDA = "#idVysledokRocnaJazdaSpolu";

  PohonneLatky();
  MotorovyOlej();
  PrevodovyOlej();
  Pneumatiky();
  Udrzba();
  Opravy();
  MzdaOsadky();
  PovinneZmluvnePoistenie();
  DanMotorovehoVozidla();
  CMRPoistenie();
  HavarijnePoistenie();
  RezijneNaklady();
  Odpis();
  Diety();

  const vysledokPHL = parseFloat($("#idVypocitanyPHL").text());
  const vysledokMO = parseFloat($("#idVypocitanyMO").text());
  const vysledokPO = parseFloat($("#idVypocitanyPO").text());
  const vysledokPn = parseFloat($("#idVypocitanyPn").text());
  const vysledokRNU = parseFloat($("#idVypocitanyRNU").text());
  const vysledokRNO = parseFloat($("#idVypocitanyRNO").text());
  const vysledokMZD = parseFloat($("#idVypocitanyMZD").text());

  // vzorce na vypocet vysledku
  const vysledokRocnaJazdaSpolu = parseFloat(
    vysledokPHL +
      vysledokMO +
      vysledokPO +
      vysledokPn +
      vysledokRNU +
      vysledokRNO +
      vysledokMZD
  );

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocnaJazdaSpolu * 10000) / 10000);
}
