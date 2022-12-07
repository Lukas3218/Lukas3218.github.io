function jeVstupSpravny(jeSpravny, hodnota, idError) {
  if (jeSpravny === false || isNaN(hodnota) === true) {
    console.log(jeSpravny, isNaN(hodnota));
    document.getElementById(idError).innerHTML = "CHYBA!!! ^^^";
    return false;
  } else {
    console.log("else kod");
    document.getElementById(idError).innerHTML = "";
    return true;
  }
}

function obstaravaciacenavozidla() {
  console.log("Zacinam pocitat...");

  // obstaravacia cena ------------------------------------------
  const jeSpravny1 = document.getElementById("formular")[0].checkValidity();
  const obstaravacia = document.getElementById("idObstaravacia").value;
  const jeSpravnyVstup1 = jeVstupSpravny(
    jeSpravny1,
    obstaravacia,
    "idErrorObstaravacia"
  );

  // zostatkova cena ------------------------------------------
  const jeSpravny2 = document.getElementById("formular")[1].checkValidity();
  const zostatkova = document.getElementById("idZostatkova").value;
  const jeSpravnyVstup2 = jeVstupSpravny(
    jeSpravny2,
    zostatkova,
    "idErrorZostatkova"
  );

  // nepocitaj vysledok ak su chybne vstupy
  if (jeSpravnyVstup1 === false || jeSpravnyVstup2 === false) {
    document.getElementById("idVypocitany").innerHTML = "";

    return;
  }

  // vypocet finalny vysledok ==================================
  const vypocitany = parseFloat(obstaravacia) + parseFloat(zostatkova);
  document.getElementById("idVypocitany").innerHTML = vypocitany.toFixed(2);

  console.log(obstaravacia, zostatkova);
}
