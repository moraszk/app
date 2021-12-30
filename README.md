# SZTE Móra Ferenc Szakkollégium Hálózati Portál

### Nav állapotának kényszerítése

A navigáció állapota kényszeríthető URL Query segítségével.

- Alapértelmezetten a dupla-nyíl ikon hamburger ikonként működik.
- `?nav=0` esetén a navigáció nem jelenik meg.
- `?nav=1` esetén a navigáció nem zárható be.

### Telepítés letiltása és engedélyezése

Az alkalmazás telepíthető és ezután elérhető az operációs rendszer start menüjéből.

Három visszautasított telepítés után a gomb eltűnik.

A Böngésző címsorából vagy menüjéből ezután is telepíthető.

- `?pwa=yes` esetén a számláló nullázódik
- `?pwa=no` esetén a számláló megtelik
