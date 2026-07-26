# Email CZ (vykání) — CB Dejvice, sbírka na modlitebnu

> **POST-QA NOTE — 27. 7. 2026**
> Proběhla jazyková QA korektura českého znění. Text e-mailu odpovídá postaveným deliverables — dokument je opět jediným zdrojem pravdy. V tomto kole byly opraveny počty znaků u variant předmětu (původní čísla nesouhlasila se skutečnou délkou).

**Governing phrase (stejná ve všech třech materiálech):** *Po třiceti letech trvalý domov v Praze 6*
**CTA (jednotné znění napříč letákem i stránkou):** **Pomozte postavit modlitebnu** → `{{LANDING_URL_CZ}}`
**Odesílatel:** konkrétní člověk — `{{SENDER_NAME}}`, `{{SENDER_TITLE}}` — nikdy obecná sborová adresa.
**Příloha:** jednostránkový leták v PDF (`{{BROCHURE_FILENAME}}`). Zmíněný jednou v textu; CTA vede na stránku, ne na PDF.
**Komu:** instituce, sbory, nadace a méně blízké kontakty.

---

## Varianty předmětu

1. **Po třiceti letech trvalý domov v Praze 6** — 40 znaků. **DOPORUČENO.** Nese governing phrase doslovně, takže předmět, nadpis letáku i nadpis stránky si po otevření odpovídají. Konkrétní, bez patosu, bez naléhání.
2. **Třicet let nedělí v pronajatém hotelu** — 37 znaků. Vede nejsilnějším faktem z celého materiálu. Vyšší zvědavost, slabší message match.
3. **{{RECIPIENT_FIRST_NAME}}, novinky z našeho sboru v Dejvicích** — 39–41 znaků u krátkého jména (samotný text bez jména má 36 znaků). Použít jen tehdy, je-li slučovací pole spolehlivé v celém seznamu; jinak variantu 1. U institucí variantu 3 nepoužívat vůbec.

Žádné emoji, žádná slova psaná velkými písmeny, žádné vykřičníky.

## Preheader

*Máme povolení stavět. 14 milionů korun již upsali naši členové. A zde je, co ještě chybí.*

---

## Tělo e-mailu

Vážená paní, vážený pane,

doufám, že se Vám daří dobře, a děkuji za přátelství, které našemu sboru po léta prokazujete.

Rád bych se s Vámi podělil o novinky z CB Dejvice, našeho sboru v Praze 6. Po více než dvaceti letech modliteb za vlastní zázemí máme povolení postavit modlitebnu na našem pozemku v Evropské ulici.

Náš sbor se již třicet let schází k nedělním bohoslužbám v pronajatém hotelovém sále dva kilometry od naší budovy. Vlastní budovu přitom máme plnou celý týden — dorost a mládež, skupinky, poradenství — a každou neděli ráno v ní nikdo z nás není. Nová modlitebna spojí všechno pod jednou střechou, ve čtvrti se 109 000 obyvateli a 38 000 vysokoškoláky, z nichž mnozí nikdy nebyli v evangelickém kostele.

Kvůli pražským stavebním předpisům musí být modlitebna postavena převážně pod zemí. Proto stojí tolik, kolik stojí.

Jak jsme na tom:

- Náklady projektu: 54 000 000 Kč
- Upsáno našimi členy: 14 000 000 Kč
- Ještě chybí: 40 000 000 Kč

Náš sbor dal jako první a dal obětavě. Nyní prosíme přátele mimo sbor, aby se přidali.

Přikládám jednostránkové shrnutí a rád bych Vás poprosil, abyste zvážili dar.

**[Pomozte postavit modlitebnu]({{LANDING_URL_CZ}})**

S vděčností,

{{SENDER_NAME}}
{{SENDER_TITLE}}, CB Dejvice
{{SENDER_EMAIL}}

P.S. Na dar rádi vystavíme potvrzení o daru pro daňové účely — stačí napsat na hospodar@cb6.cz. Vše ostatní najdete zde: [Pomozte postavit modlitebnu]({{LANDING_URL_CZ}})

---

## Přímé darování (volitelný blok pod podpisem)

Chcete-li poslat dar přímo, bez mezikroku:

Číslo účtu: **1031051032/5500** (Raiffeisenbank)
Variabilní symbol: **5061999**
Zpráva pro příjemce: **Na modlitebnu**

Na požádání vystavíme potvrzení o daru pro daňové účely — hospodar@cb6.cz.

**Poznámka pro build:** u institucí, nadací a partnerských sborů tento blok **ponechat** — instituce potřebují platební údaje k interní přípravě daru dřív, než někam kliknou. U jednotlivců, které dobře neznáte, ho lze vynechat ve prospěch stránky.

---

## Poznámky pro build

- **Oslovení:** "Vážená paní, vážený pane," je bezpečná gender-neutrální forma. Jméno se do ní záměrně neslučuje — čeština vyžaduje 5. pád ("Vážený pane Nováku,"), zatímco slučovací pole dodá 1. pád, což je gramatická chyba. Pokud je u kontaktu známé pohlaví, titul a správný tvar jména, nahradit přesnou variantou ("Vážený pane faráři,", "Vážená paní ředitelko,", "Vážený pane Nováku,"). Pro instituci bez konkrétní osoby použít "Vážení,".
- **Rozsah:** cca 255 slov (od oslovení po P.S.).
- **CTA se objevuje dvakrát** — jednou jako hlavní tlačítko za výzvou, jednou jako textový odkaz v P.S. Stejná slova, stejný cíl.
- **PDF leták** je zmíněný v předposledním odstavci a přiložený ke zprávě. Záměrně *není* cílem CTA.
- **Nepřidávat** odpočet, termín, ukazatel s červeným číslem ani větu "bez Vás to nezvládneme". Spodní hranice tónu je pohyb vpřed, ne nouze.
- **Věrnost zdroji:** zdroj říká *mnozí*, ne "většina". Neposouvat.
- **Registr:** vykání je vedeno důsledně — Vám, Vás, prokazujete, zvážili, najdete; zdvořilostní zájmena s velkým počátečním písmenem. Obsah je jinak shodný s tykací verzí; liší se pouze registr, oslovení, znění CTA a zacházení s blokem platebních údajů.
