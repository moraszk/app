<script context="module" lang="ts">
  export const prerender = true;
</script>

<svelte:head>
  <title>Internet státusz</title>
</svelte:head>

<section id="status">
  <article>
    <h1 id="welcome">Üdv $(username)!</h1>
    <table>
      <tbody>
        <tr>
          <td>Belső IP cím</td>
          <td>$(ip)</td>
        </tr>

        <tr>
          <td>Eszköz azonosító</td>
          <td>$(mac)</td>
        </tr>

        <tr>
          <td>Tiltások:</td>
          <td>
            Torrentezés: <span id="torrent-guys" style="color: green">Tiszta vagy!</span><br />
            Túl sok kapcsolat: <span id="many-connections" style="color: green">Tiszta vagy!</span>
          </td>
        </tr>
        <tr>
          <td>Internethasználati idő</td>
          <td>$(uptime)</td>
        </tr>
        <tr
          ><td>Hálózati problémák</td>
          <td
            >Ha óránként többször be kell jelentkezned vagy egy alkalmazás nem működik az új
            hálózaton, akkor jelezd nekünk a
            <a href="https://support.mora.u-szeged.hu">hiba bejelentő oldalon</a></td
          ></tr
        >
        <tr
          ><td>Rendszergazdák ábécében</td>
          <td
            >Juhász Andor (V/14),<br />
            Kiss Ádám (III/S),<br />
            Südi Tamás (I/4),<br />
            Tajti Viktor (V/14)</td
          ></tr
        ></tbody
      >
    </table>
  </article>
</section>

<style>
  a {
    color: #486173;
  }

  h1 {
    text-align: center;
    color: var(--text-primary);
    font-size: 24px !important;
  }

  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 16px;
    color: black;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 20px;
  }

  table td {
    color: var(--text-primary);
    border-bottom: 1px solid #e6e6e6;
    padding: 10px 4px 10px 0;
  }

  table td:first-child {
    font-weight: 700;
  }

  .dark table td {
    border-bottom: 1px solid #505050;
  }
</style>
