# Email CZ (tykání) — CB Dejvice, sbírka na modlitebnu

> **POST-QA NOTE — 27. 7. 2026**
> Proběhla jazyková QA korektura českého znění. Text e-mailu odpovídá postaveným deliverables — dokument je opět jediným zdrojem pravdy. V tomto kole byly opraveny počty znaků u variant předmětu (původní čísla nesouhlasila se skutečnou délkou).

**Governing phrase (stejná ve všech třech materiálech):** *Po třiceti letech trvalý domov v Praze 6*
**CTA (tykací varianta):** **Pomoz postavit modlitebnu** → `{{LANDING_URL_CZ}}`
**Odesílatel:** konkrétní člověk — `{{SENDER_NAME}}`, `{{SENDER_TITLE}}` — nikdy obecná sborová adresa.
**Příloha:** jednostránkový leták v PDF (`{{BROCHURE_FILENAME}}`). Zmíněný jednou v textu; CTA vede na stránku, ne na PDF.

---

## Varianty předmětu

1. **Po třiceti letech trvalý domov v Praze 6** — 40 znaků. **DOPORUČENO.** Nese governing phrase doslovně, takže předmět, nadpis letáku i nadpis stránky si po otevření odpovídají. Konkrétní, bez patosu, bez naléhání.
2. **Třicet let nedělí v pronajatém hotelu** — 37 znaků. Vede nejsilnějším faktem z celého materiálu. Vyšší zvědavost, slabší message match.
3. **{{RECIPIENT_FIRST_NAME}}, novinky z našeho sboru v Dejvicích** — 39–41 znaků u krátkého jména (samotný text bez jména má 36 znaků). Použij jen tehdy, když je slučovací pole spolehlivé v celém seznamu; jinak variantu 1.

Žádné emoji, žádná slova psaná velkými písmeny, žádné vykřičníky.

## Preheader

*Máme povolení stavět. 14 milionů korun už upsali naši členové. A tady je, co ještě chybí.*

---

## Tělo e-mailu

Ahoj {{RECIPIENT_NAME}},

doufám, že se Ti daří dobře, a děkuji za přátelství, které našemu sboru už roky prokazuješ.

Rád bych se s Tebou podělil o novinky z CB Dejvice, našeho sboru v Praze 6. Po více než dvaceti letech modliteb za vlastní zázemí máme povolení postavit modlitebnu na našem pozemku v Evropské ulici.

Náš sbor se už třicet let schází k nedělním bohoslužbám v pronajatém hotelovém sále dva kilometry od naší budovy. Vlastní budovu přitom máme plnou celý týden — dorost a mládež, skupinky, poradenství — a každou neděli ráno v ní nikdo z nás není. Nová modlitebna spojí všechno pod jednou střechou, ve čtvrti se 109 000 obyvateli a 38 000 vysokoškoláky, z nichž mnozí nikdy nebyli v evangelickém kostele.

Kvůli pražským stavebním předpisům musí být modlitebna postavena převážně pod zemí. Proto stojí tolik, kolik stojí.

Jak jsme na tom:

- Náklady projektu: 54 000 000 Kč
- Upsáno našimi členy: 14 000 000 Kč
- Ještě chybí: 40 000 000 Kč

Náš sbor dal jako první a dal obětavě. Teď prosíme přátele mimo sbor, aby se přidali.

Přikládám jednostránkové shrnutí. Rád bych Tě poprosil, abys zvážil dar.

**[Pomoz postavit modlitebnu]({{LANDING_URL_CZ}})**

S vděčností,

{{SENDER_NAME}}
{{SENDER_TITLE}}, CB Dejvice
{{SENDER_EMAIL}}

P.S. Na dar rádi vystavíme potvrzení o daru pro daňové účely — stačí napsat na hospodar@cb6.cz. Všechno ostatní najdeš tady: [Pomoz postavit modlitebnu]({{LANDING_URL_CZ}})

---

## Přímé darování (volitelný blok pod podpisem)

Pokud chceš poslat dar rovnou, bez mezikroku:

Číslo účtu: **1031051032/5500** (Raiffeisenbank)
Variabilní symbol: **5061999**
Zpráva pro příjemce: **Na modlitebnu**

**Poznámka pro build:** tenhle blok je volitelný. Zařaď ho jen do rozeslání pro blízké kontakty, u kterých je pravděpodobné, že pošlou dar okamžitě. U ostatních ho vynech — konkuruje CTA a obchází stránku, kde je celý příběh projektu.

---

## Poznámky pro build

- **Rozsah:** cca 250 slov (od oslovení po P.S., bez předmětu, preheaderu a slučovacích polí). Stejný strop jako v EN verzi.
- **CTA se objevuje dvakrát** — jednou jako hlavní tlačítko za výzvou, jednou jako textový odkaz v P.S. Stejná slova, stejný cíl.
- **PDF leták** je zmíněný v předposledním odstavci ("Přikládám jednostránkové shrnutí") a přiložený ke zprávě. Záměrně *není* cílem CTA.
- **Nepřidávej** odpočet, termín, obrázek s ukazatelem a červeným číslem ani větu "bez Tebe to nezvládneme". Spodní hranice tónu je pohyb vpřed, ne nouze.
- Pokud `{{RECIPIENT_NAME}}` nelze spolehlivě sloučit, začni "Ahoj," místo rizika "Ahoj ,".
- **5. pád v oslovení:** čeština vyžaduje po "Ahoj" vokativ — "Ahoj Petře,", ne "Ahoj Petr,". Slučovací pole se jménem v 1. pádu je gramaticky špatně a v tykacím dopise to bije do očí. Do seznamu doplnit samostatné pole s ručně zapsaným 5. pádem (např. `{{RECIPIENT_VOCATIVE}}`) a slučovat to; jinak použít "Ahoj," bez jména.
- **Rod adresáta:** věta "Rád bych Tě poprosil, abys zvážil dar." počítá s mužským adresátem. Pro adresátky připravit variantu "…abys zvážila dar." a rozeslat podle pole s pohlavím; pokud pole není, přeformulovat na "Rád bych Tě poprosil o dar."
- **Věrnost zdroji:** zdroj říká, že *mnozí* v Praze 6 nikdy nebyli v evangelickém kostele. Neposouvat na "většina" — zdroj to neunese.
- **Registr:** tykání je vedeno důsledně (Ti, Tebou, děkuji, najdeš). Zájmena v tykání se píšou s malým počátečním písmenem podle běžného úzu; velká písmena (Ti, Tebe) jsou zde ponechána jako zdvořilostní varianta — sjednoť podle preference odesílatele, ale v celém textu stejně.
