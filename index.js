function jeVstupSpravny(idVstup, idError) {
  const hodnota = $(idVstup).val();
  const upravenaHodnota = hodnota.replaceAll(" ", "").replaceAll(",", ".");

  if (upravenaHodnota === "") {
    $(idError).text("Nezadane udaje");
    $(idVstup).addClass("chybny-vstup");
    return false;
  }

  if (isNaN(upravenaHodnota) === true) {
    $(idError).text("Chybne zadane udaje");
    $(idVstup).addClass("chybny-vstup");
    return false;
  }

  if (upravenaHodnota < 0) {
    $(idError).text("Zadana zaporna hodnota");
    $(idVstup).addClass("chybny-vstup");
    return false;
  }

  $(idError).text("");
  $(idVstup).removeClass("chybny-vstup");
  return true;
}

/**
 * odstranit medzery
 *  prepisat ciarku na bodku
 *  parse float
 * @param hodnota nacitana ciselna hodnta z formularu
 * @returns cislo bez medzier a pripadne s desatinnou ciarkou
 */
function UpravaHodnoty(hodnota) {
  if (isNaN(hodnota) === false) {
    return parseFloat(hodnota);
  }

  const hodnotaBezMedzery = hodnota.replaceAll(" ", "");
  const hodnotaSBodkou = hodnotaBezMedzery.replaceAll(",", ".");
  return parseFloat(hodnotaSBodkou);
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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const PHL = UpravaHodnoty($("#idPHL").val());
  const SV = UpravaHodnoty($("#idSV").val());

  // vzorce na vypocet vysledku
  const vysledokRocny = UpravaHodnoty((SV * PHL * RJV) / 100);
  const vysledokJednotkovy = UpravaHodnoty(vysledokRocny / RJV);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const CMO = UpravaHodnoty($("#idCMO").val());
  const OMO = UpravaHodnoty($("#idOMO").val());
  const ZMO = UpravaHodnoty($("#idZMO").val());
  const SMO = UpravaHodnoty($("#idSMO").val());

  // vzorce na vypocet vysledku
  const vysledokRocny = UpravaHodnoty(
    (SMO * CMO * RJV) / 10000 + (OMO * CMO * RJV) / ZMO
  );
  const vysledokJednotkovy = UpravaHodnoty(vysledokRocny / RJV);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const ZP = UpravaHodnoty($("#idZP").val());
  const ZD = UpravaHodnoty($("#idZD").val());
  const SPO = UpravaHodnoty($("#idSPO").val());
  const OPO = UpravaHodnoty($("#idOPO").val());
  const CPO = UpravaHodnoty($("#idCPO").val());

  // vzorce na vypocet vysledku
  const vysledokRocny = UpravaHodnoty(
    (SPO * CPO * RJV) / ZP + (OPO * CPO * RJV) / ZD
  );
  const vysledokJednotkovy = UpravaHodnoty(vysledokRocny / RJV);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const PKP = UpravaHodnoty($("#idPKP").val());
  const CKP = UpravaHodnoty($("#idCKP").val());
  const ZPn = UpravaHodnoty($("#idZPn").val());

  // vzorce na vypocet vysledku
  const vysledokRocny = UpravaHodnoty((PKP * CKP * RJV) / ZPn);
  const vysledokJednotkovy = UpravaHodnoty(vysledokRocny / RJV);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const RNU = UpravaHodnoty($("#idRNU").val());

  // vzorce na vypocet vysledku

  const vysledokRocny = UpravaHodnoty(RNU);
  const vysledokJednotkovy = UpravaHodnoty(vysledokRocny / RJV);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const RNO = UpravaHodnoty($("#idRNO").val());

  // vzorce na vypocet vysledku

  const vysledokRocny = UpravaHodnoty(RNO);
  const vysledokJednotkovy = UpravaHodnoty(vysledokRocny / RJV);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const PZR = UpravaHodnoty($("#idPZR").val());
  const PRJV = UpravaHodnoty($("#idPRJV").val());
  const PPZR = UpravaHodnoty($("#idPPZR").val());
  const MZD = UpravaHodnoty($("#idMZD").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = UpravaHodnoty(MZD * (PRJV / 100));
  const vysledokRocnyPrestoj = UpravaHodnoty(MZD * (PPZR / 100));
  const vysledokJednotkovyJazda = UpravaHodnoty(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = UpravaHodnoty(vysledokRocnyPrestoj / PZR);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const PZR = UpravaHodnoty($("#idPZR").val());
  const PRJV = UpravaHodnoty($("#idPRJV").val());
  const PPZR = UpravaHodnoty($("#idPPZR").val());
  const PZP = UpravaHodnoty($("#idPZP").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = UpravaHodnoty(PZP * (PRJV / 100));
  const vysledokRocnyPrestoj = UpravaHodnoty(PZP * (PPZR / 100));
  const vysledokJednotkovyJazda = UpravaHodnoty(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = UpravaHodnoty(vysledokRocnyPrestoj / PZR);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const PZR = UpravaHodnoty($("#idPZR").val());
  const PRJV = UpravaHodnoty($("#idPRJV").val());
  const PPZR = UpravaHodnoty($("#idPPZR").val());
  const DMV = UpravaHodnoty($("#idDMV").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = UpravaHodnoty(DMV * (PRJV / 100));
  const vysledokRocnyPrestoj = UpravaHodnoty(DMV * (PPZR / 100));
  const vysledokJednotkovyJazda = UpravaHodnoty(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = UpravaHodnoty(vysledokRocnyPrestoj / PZR);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const PZR = UpravaHodnoty($("#idPZR").val());
  const PRJV = UpravaHodnoty($("#idPRJV").val());
  const PPZR = UpravaHodnoty($("#idPPZR").val());
  const CMR = UpravaHodnoty($("#idCMR").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = UpravaHodnoty(CMR * (PRJV / 100));
  const vysledokRocnyPrestoj = UpravaHodnoty(CMR * (PPZR / 100));
  const vysledokJednotkovyJazda = UpravaHodnoty(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = UpravaHodnoty(vysledokRocnyPrestoj / PZR);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const PZR = UpravaHodnoty($("#idPZR").val());
  const PRJV = UpravaHodnoty($("#idPRJV").val());
  const PPZR = UpravaHodnoty($("#idPPZR").val());
  const HP = UpravaHodnoty($("#idHP").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = UpravaHodnoty(HP * (PRJV / 100));
  const vysledokRocnyPrestoj = UpravaHodnoty(HP * (PPZR / 100));
  const vysledokJednotkovyJazda = UpravaHodnoty(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = UpravaHodnoty(vysledokRocnyPrestoj / PZR);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const PZR = UpravaHodnoty($("#idPZR").val());
  const PRJV = UpravaHodnoty($("#idPRJV").val());
  const PPZR = UpravaHodnoty($("#idPPZR").val());
  const RN = UpravaHodnoty($("#idRN").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = UpravaHodnoty(RN * (PRJV / 100));
  const vysledokRocnyPrestoj = UpravaHodnoty(RN * (PPZR / 100));
  const vysledokJednotkovyJazda = UpravaHodnoty(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = UpravaHodnoty(vysledokRocnyPrestoj / PZR);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const PZR = UpravaHodnoty($("#idPZR").val());
  const PRJV = UpravaHodnoty($("#idPRJV").val());
  const PPZR = UpravaHodnoty($("#idPPZR").val());
  const ODP = UpravaHodnoty($("#idODP").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = UpravaHodnoty(ODP * (PRJV / 100));
  const vysledokRocnyPrestoj = UpravaHodnoty(ODP * (PPZR / 100));
  const vysledokJednotkovyJazda = UpravaHodnoty(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = UpravaHodnoty(vysledokRocnyPrestoj / PZR);

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

  const RJV = UpravaHodnoty($("#idRJV").val());
  const PZR = UpravaHodnoty($("#idPZR").val());
  const PRJV = UpravaHodnoty($("#idPRJV").val());
  const PPZR = UpravaHodnoty($("#idPPZR").val());
  const VRD = UpravaHodnoty($("#idVRD").val());

  // vzorce na vypocet vysledku

  const vysledokRocnyJazda = UpravaHodnoty(VRD * (PRJV / 100));
  const vysledokRocnyPrestoj = UpravaHodnoty(VRD * (PPZR / 100));
  const vysledokJednotkovyJazda = UpravaHodnoty(vysledokRocnyJazda / RJV);
  const vysledokJednotkovyPrestoj = UpravaHodnoty(vysledokRocnyPrestoj / PZR);

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

  const vysledokPHL = UpravaHodnoty($("#idVypocitanyPHL").text());
  const vysledokMO = UpravaHodnoty($("#idVypocitanyMO").text());
  const vysledokPO = UpravaHodnoty($("#idVypocitanyPO").text());
  const vysledokPn = UpravaHodnoty($("#idVypocitanyPn").text());
  const vysledokRNU = UpravaHodnoty($("#idVypocitanyRNU").text());
  const vysledokRNO = UpravaHodnoty($("#idVypocitanyRNO").text());
  const vysledokMZD = UpravaHodnoty($("#idVypocitanyMZD").text());
  const vysledokPZP = UpravaHodnoty($("#idVypocitanyPZP").text());
  const vysledokDMV = UpravaHodnoty($("#idVypocitanyDMV").text());
  const vysledokCMR = UpravaHodnoty($("#idVypocitanyCMR").text());
  const vysledokHP = UpravaHodnoty($("#idVypocitanyHP").text());
  const vysledokRN = UpravaHodnoty($("#idVypocitanyRN").text());
  const vysledokODP = UpravaHodnoty($("#idVypocitanyODP").text());
  const vysledokVRD = UpravaHodnoty($("#idVypocitanyVRD").text());

  // vzorec na vypocet vysledku
  const vysledokRocnaJazdaSpolu = UpravaHodnoty(
    vysledokPHL +
      vysledokMO +
      vysledokPO +
      vysledokPn +
      vysledokRNU +
      vysledokRNO +
      vysledokMZD +
      vysledokPZP +
      vysledokDMV +
      vysledokCMR +
      vysledokHP +
      vysledokRN +
      vysledokODP +
      vysledokVRD
  );

  // zapisanie vysledku

  $(ID_ROCNA_JAZDA).text(Math.round(vysledokRocnaJazdaSpolu * 100) / 100);
}

/** Rocne naklady na jednotkovu jazdu spolu ==============================================================================
 * Pre vypocet potrebujeme:
 * - vysledky jednotkovych fixnych a jednotkovych variabilnych nakladov na jazdu
 * @returns vyska jednotkovych fixnych a jednotkovych variabilnych nakladov na jazdu spolu
 */

function JednotkovaJazdaSpolu() {
  const ID_JEDNOTKOVA_JAZDA = "#idVysledokJednotkovaJazdaSpolu";

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

  const vysledokPHL = UpravaHodnoty($("#idVypocitanyPHLjednotkove").text());
  const vysledokMO = UpravaHodnoty($("#idVypocitanyMOjednotkove").text());
  const vysledokPO = UpravaHodnoty($("#idVypocitanyPOjednotkove").text());
  const vysledokPn = UpravaHodnoty($("#idVypocitanyPnjednotkove").text());
  const vysledokRNU = UpravaHodnoty($("#idVypocitanyRNUjednotkove").text());
  const vysledokRNO = UpravaHodnoty($("#idVypocitanyRNOjednotkove").text());
  const vysledokMZD = UpravaHodnoty($("#idVypocitanyMZDjednotkove").text());
  const vysledokPZP = UpravaHodnoty($("#idVypocitanyPZPjednotkove").text());
  const vysledokDMV = UpravaHodnoty($("#idVypocitanyDMVjednotkove").text());
  const vysledokCMR = UpravaHodnoty($("#idVypocitanyCMRjednotkove").text());
  const vysledokHP = UpravaHodnoty($("#idVypocitanyHPjednotkove").text());
  const vysledokRN = UpravaHodnoty($("#idVypocitanyRNjednotkove").text());
  const vysledokODP = UpravaHodnoty($("#idVypocitanyODPjednotkove").text());
  const vysledokVRD = UpravaHodnoty($("#idVypocitanyVRDjednotkove").text());

  // vzorec na vypocet vysledku
  const vysledokJednotkovaJazdaSpolu = UpravaHodnoty(
    vysledokPHL +
      vysledokMO +
      vysledokPO +
      vysledokPn +
      vysledokRNU +
      vysledokRNO +
      vysledokMZD +
      vysledokPZP +
      vysledokDMV +
      vysledokCMR +
      vysledokHP +
      vysledokRN +
      vysledokODP +
      vysledokVRD
  );

  // zapisanie vysledku

  $(ID_JEDNOTKOVA_JAZDA).text(
    Math.round(vysledokJednotkovaJazdaSpolu * 100) / 100
  );
}

/** Rocne naklady na prestoj spolu ==============================================================================
 * Pre vypocet potrebujeme:
 * - vysledky rocnych fixnych a rocnych variabilnych nakladov na prestoj
 * @returns vyska rocnych fixnych a rocnych variabilnych nakladov na prestoj spolu
 */

function RocnyPrestojSpolu() {
  const ID_ROCNY_PRESTOJ = "#idVysledokRocnyPrestojSpolu";

  MzdaOsadky();
  PovinneZmluvnePoistenie();
  DanMotorovehoVozidla();
  CMRPoistenie();
  HavarijnePoistenie();
  RezijneNaklady();
  Odpis();
  Diety();

  const vysledokMZD = UpravaHodnoty($("#idVypocitanyMZD2").text());
  const vysledokPZP = UpravaHodnoty($("#idVypocitanyPZP2").text());
  const vysledokDMV = UpravaHodnoty($("#idVypocitanyDMV2").text());
  const vysledokCMR = UpravaHodnoty($("#idVypocitanyCMR2").text());
  const vysledokHP = UpravaHodnoty($("#idVypocitanyHP2").text());
  const vysledokRN = UpravaHodnoty($("#idVypocitanyRN2").text());
  const vysledokODP = UpravaHodnoty($("#idVypocitanyODP2").text());
  const vysledokVRD = UpravaHodnoty($("#idVypocitanyVRD2").text());

  // vzorec na vypocet vysledku
  const VysledokRocnyPrestojSpolu = UpravaHodnoty(
    vysledokMZD +
      vysledokPZP +
      vysledokDMV +
      vysledokCMR +
      vysledokHP +
      vysledokRN +
      vysledokODP +
      vysledokVRD
  );

  // zapisanie vysledku

  $(ID_ROCNY_PRESTOJ).text(Math.round(VysledokRocnyPrestojSpolu * 100) / 100);
}

/** Jednotkove naklady na prestoj spolu ==============================================================================
 * Pre vypocet potrebujeme:
 * - vysledky jednotkovych fixnych a jednotkovych variabilnych nakladov na prestoj
 * @returns vyska jednotkovych fixnych a jednotkovych variabilnych nakladov na prestoj spolu
 */

function JednotkovyPrestojSpolu() {
  const ID_JEDNOTKOVY_PRESTOJ = "#idVysledokJednotkovyPrestojSpolu";

  MzdaOsadky();
  PovinneZmluvnePoistenie();
  DanMotorovehoVozidla();
  CMRPoistenie();
  HavarijnePoistenie();
  RezijneNaklady();
  Odpis();
  Diety();

  const vysledokMZD = UpravaHodnoty($("#idVypocitanyMZDjednotkove2").text());
  const vysledokPZP = UpravaHodnoty($("#idVypocitanyPZPjednotkove2").text());
  const vysledokDMV = UpravaHodnoty($("#idVypocitanyDMVjednotkove2").text());
  const vysledokCMR = UpravaHodnoty($("#idVypocitanyCMRjednotkove2").text());
  const vysledokHP = UpravaHodnoty($("#idVypocitanyHPjednotkove2").text());
  const vysledokRN = UpravaHodnoty($("#idVypocitanyRNjednotkove2").text());
  const vysledokODP = UpravaHodnoty($("#idVypocitanyODPjednotkove2").text());
  const vysledokVRD = UpravaHodnoty($("#idVypocitanyVRDjednotkove2").text());

  // vzorec na vypocet vysledku
  const VysledokJednotkovyPrestojSpolu = UpravaHodnoty(
    vysledokMZD +
      vysledokPZP +
      vysledokDMV +
      vysledokCMR +
      vysledokHP +
      vysledokRN +
      vysledokODP +
      vysledokVRD
  );

  // zapisanie vysledku

  $(ID_JEDNOTKOVY_PRESTOJ).text(
    Math.round(VysledokJednotkovyPrestojSpolu * 100) / 100
  );
}
function SPOLU() {
  RocnaJazdaSpolu();
  JednotkovaJazdaSpolu();
  RocnyPrestojSpolu();
  JednotkovyPrestojSpolu();
}
