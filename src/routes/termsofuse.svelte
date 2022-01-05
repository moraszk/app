<script>
  import { onMount } from 'svelte';
  import sztenetpdf from '$lib/assets/sztenet.pdf';

  onMount(() => import('@shoelace-style/shoelace/dist/components/alert/alert.js'));
</script>

<img class="header-icon" id="moralogo" src="/icon/icon-96x96.png" alt="Móra Ferenc Szakkollégium" />
<img class="header-icon" id="sztelogo" src="/icon/szte.png" alt="Szegedi Tudományegyetem" />

<section>
  <article id="terms">
    <section id="kolinet">
      <h2>A kollégiumi hálózat</h2>
      <p>Az SZTE Móra Ferenc Szakkollégium hálózatának (MóraNET) üzemeltetője maga a kollégium.</p>
      <h4>Hálózathasználati feltételek</h4>
      <p>
        A kollégium lakója akkor veheti igénybe a hálózatot, ha arra regisztrálta magát az összes
        szükséges adat megadásával az adott félévben.
      </p>
      <p>
        Egy felhasználó legfeljebb <b>három aktív eszközön</b> lehet egyszerre bejelentkezve. Egy
        eszköz attól a perctől aktív, hogy a felhasználó bejelentkezett rajta a
        <a rel="noopener noreferrer" href="https://captiveportal.mora.u-szeged.hu"
          >https://captiveportal.mora.u-szeged.hu</a
        >
        -n. Az eszköz <b>automatikusan inaktív állapotba kerül</b>, ha a felhasználó kijelentkezik
        rajta, vagy, ha egy napja nem csatlakozott fel a kollégiumi hálózatra.
      </p>
      <p>
        A felhasználó feladata gondoskodni arról, hogy a felhasználójához kapcsolt eszközök
        megfeleljenek a jelen szabályzatnak.
      </p>
      <h4>Elérhető szolgáltatások</h4>
      <p>
        Fent tartjuk a jogot, hogy a tanuláshoz nem szükséges szolgáltatásokat tiltsuk vagy
        korlátozzuk az adatforgalom csökkentése érdekében.
      </p>
      <p class="quote">
        Amennyiben egy weboldal vagy alkalmazás nem működik a kollégiumi hálózaton, a <a
          target="_black"
          rel="noopener noreferer"
          href="https://support.mora.u-szeged.hu">https://support.mora.u-szeged.hu</a
        > oldalon kérheted a kivétel hozzáadását.
      </p>

      <h4>Tilos a torrentezés, beleértve a le- és a feltöltést is.</h4>
      <p>
        Sok fájlmegosztó program a háttérben indul és azonnal megpróbálja felvenni a kapcsolatot az
        interneten található társaival. Ennek kikapcsolása a hálózathoz való csatlakozás előtt a
        felhasználó feladata.
      </p>

      <h3>Rögzített adatok</h3>
      <p>
        A felhasználónak lehetősége van arról érdeklődni, hogy milyen adatokat rögzítettünk a
        hálózati tevékenységéről.
      </p>
      <h4>Az adatok rögzítésének irányelve, ezeket tároljuk:</h4>
      <ul>
        <li>
          Nem tároljuk a forgalom tartalmát (ez a legtöbb esetben amúgy is titkosított forgalom),
          csupán annak mennyiségét, forrását, és irányát; illetve ezeket felhasználóhoz kötjük.
        </li>
        <li>Kapcsolódás és bejelentkezés a hálózatra, kiosztott hálózati cím.</li>
        <li>Felhasznált adatforgalom.</li>
        <li>Automatikusan kiosztott tiltás esetén annak okát dokumentáló adatok.</li>
        <li>
          Emailezés esetén a kliens és a szerver címe (pl. gmail.com), a tevékenység időpontja.
        </li>
        <li>A kollégiumi hálózat továbbosztása.</li>
        <li>
          A hálózat fejlesztése és tesztelése céljából rövid ideig ennél több adat is rögzítésre
          kerülhet.
        </li>
        <li>
          A jelen felsorolás nem tartalmazza a kollégium belső szolgáltatásai és weboldalai
          használatakor rögzített adatokat, ezeket általában az adott szoftver felhasználási
          feltételei között lehet megtalálni.
        </li>
        <li>
          Fegyelmi eljárás esetén az összegyűjtött adatokat a Szegedi Tudományegyetemnek kiadhatjuk.
        </li>
      </ul>
      <h3>Automatikusan kiosztott korlátozások</h3>
      A rendszer automatikusan korlátozhatja a felhasználókat a szabályzat megszegése, vagy gyanús tevékenység
      esetén.
      <h4>Torrentezés</h4>
      <p>Bármilyen torrentezés esetén egy hét teljes tiltás, feloldás csak rendkívüli esetben.</p>
      <p class="quote">
        Mivel automatikusan kiosztott tiltás esetén a felhasználó adatforgalma nem hagyta el a
        kollégiumi belső hálózatot, az incidensről automatikusan csak az érintett felhasználó és a
        kollégium rendszergazdái értesülnek.
      </p>
      <h4>Szokatlan terhelést okozó tevékenység</h4>
      <p>
        Ez a tiltás akkor lép érvénybe, ha a felhasználó gyanúsan sok különböző kapcsolatot használ
        egyszerre.
      </p>
      <p>
        Ez általában nincs kapcsolatban az adatmennyiséggel, a forgalom típusa miatt terheli a
        hálózatot.
      </p>
      <span class="quote"
        >Volt már rá példa, hogy egyetlen felhasználó 400%-os összterhelést okozott, ez a szabály
        ezt hívatott megelőzni</span
      >
      <p>
        A legtöbb letöltéskezelő program legfeljebb 20-30, a böngészők kiszolgálónként legfeljebb 10
        kapcsolatot használnak egyszerre.
      </p>
      <p>
        Ha egy eszköz gyanúsan sok (600) különböző kapcsolatot használ egyszerre, azt egy hétre
        letiltja a rendszer. Ezt gyakran egy, az eszközön található kártékony program okozza. A
        tiltást eltávolítjuk, ha a felhasználó kijavította a probléma okát, vagy felmutatta egy
        megbízható vírusírtó (nem windows defender) futásának negatív eredményét.
      </p>
      <p class="quote">
        Így számoljuk az aktív kapcsolatok számát: tcp esetén timeout 6 perc, udp esetén 3 perc,
        icmp esetén 10 sec, egyébként 10 perc.
      </p>
      <h4>Belső hálózat felderítése</h4>
      <p>
        Ha egy eszköz 75 különböző kapcsolatot nyit meg egyszerre a kollégium hálózatának többi
        felhasználója felé, akkor a rendszer az adott eszközt hatvan percre letiltja a többi
        felhasználó elérésétől. Ilyenkor a kollégiumi szerverek és az internet felé továbbra is
        szabadon forgalmazhat.
      </p>
      <p>
        Ennek oka leggyakrabban egy vírus vagy egy túl agresszív vírusírtó, esetleg egy rosszul
        megírt program (például egy többjátékos telefonos játék).
      </p>
      <h3>Biztosított dolgok a kollégisták számára</h3>
      <p>
        A <a target="_blank" rel="noopener noreferrer" href="https://support.mora.u-szeged.hu"
          >https://support.mora.u-szeged.hu</a
        > hibabejelentő oldal.
      </p>
      <p>
        Legalább 20 Mbit/sec engedélyezett sebesség az internet felé, amely akár 75 mbit/sec-re is
        megugorhat, ha a készülék az utóbbi néhány másodpercben kevés adatforgalmat használt. Így
        gyorsabban betöltődnek a weblapok és az online nézhető videók.
      </p>
      <p class="quote">
        Ez a legkisebb engedélyezett sávszélesség. <br />
        Kevésbé forgalmas időszakokban, például éjféltől és hétvégén ennél sokkal gyorsabb lehet az internet.
      </p>
      <p class="quote">Vezetéken általában gyorsabb az internet mint a WiFi-n.</p>
    </section>
    <section id="sztenet">
      <h3>Az SZTENET internetszolgáltató</h3>
      <p>A kollégium internetszolgáltatója a Szegedi Tudományegyetem (AS6711).</p>
      <p>
        Szabályzata
        <a rel="noopener noreferrer" target="_blank" href={sztenetpdf}>itt érhető el</a>
      </p>
      <h4>A szabályzat legfontosabb pontjai</h4>
      <p>
        A Szegedi Tudományegyetem (SZTE) számítógépes hálózata (SZTENET) az egyetemen folyó oktatás,
        kutatás, hazai és nemzetközi kapcsolattartás, továbbá az ügyvitel és a gyógyítás
        elengedhetetlenül fontos infrastrukturális része.
      </p>
      <ul>
        <li>A hálózaton tilos torrentezni</li>
        <li>A hálózaton tilos bármiféle kereskedelmi tevékenység folytatása</li>
        <li>Tilos illetéktelen jogosultságok és adatok megszerzése, használata</li>
        <li>Tilos a hálózati eszközök önkényes átkonfigurálása</li>
        <li>
          A szabályzatot sértő felhasználót az üzemeltető határozott időre felfüggesztheti az
          SZTENET használatára való minden jogosultságából
        </li>
      </ul>
    </section>
    <article />
  </article>
</section>

<style lang="scss">
  .header-icon {
    z-index: 0;
    top: 0;
    width: 96px;
    height: auto;
  }
  #moralogo {
    position: relative;
    left: 0;
    // fix not full size
    transform: translate(-8px, -3px);
  }
  #sztelogo {
    position: absolute;
    right: 1em;
  }

  a {
    color: #45667e;
  }
  .quote {
    border-left: 1px solid var(--sl-color-neutral-800);
    padding-left: 1em;
    opacity: 0.8;
    a {
      color: var(--sl-color-neutral-900);
    }
  }
  // .responsive {
  //   width: 100%;
  //   height: auto;
  // }
  #terms {
    text-align: justify;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // margin: 96px var(--nav-width) 0 var(--nav-width);
    & > * {
      max-width: 800px;
      width: 100%;
    }
  }
  @media screen and (min-width: $br-md) {
    #terms {
      padding-left: 5vw;
      padding-right: 5vw;
    }
  }
</style>
