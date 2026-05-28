import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

const includesAll = (items) => {
  for (const item of items) {
    assert.ok(html.includes(item), `Expected page to include: ${item}`);
  }
};

test('uses current source-site identity and contact details', () => {
  includesAll([
    'Код ЄДРПОУ: 36738974',
    '79060',
    'вул. Княгині Ольги, буд. 122',
    'profc@locz.gov.ua',
    '(032) 232-22-62',
    '(032) 244-13-30',
    '(067) 672-08-52',
    '(032) 244-13-31',
    'Плахотнюк Зоряна Іванівна',
  ]);
});

test('lists the full source-site profession page set', () => {
  const professionCards = html.match(/data-profession-card=/g) ?? [];
  assert.equal(professionCards.length, 17);

  includesAll([
    'Електрогазозварник',
    'Монтажник санітарно-технічних систем і устаткування',
    'Водій трамвая',
    'Водій тролейбуса',
    'Касир торговельного залу',
    'Продавець продовольчих товарів',
    'Продавець непродовольчих товарів',
    'Оператор котельні',
    'Машиніст (кочегар) котельні',
    'Тракторист-машиніст сільськогосподарського виробництва',
    'Монтер кабельного виробництва',
    'Перукар (перукар-модельєр)',
    'Манікюрник',
    'Візажист',
    'Фермер',
    'Швачка',
    'Оператор з обробки інформації та програмного забезпечення',
  ]);
});

test('surfaces latest source news and priority programs', () => {
  includesAll([
    'Знання, що рятують життя!',
    'Перша у цьому році група успішно завершила навчання з використання агродронів',
    'ПЕРША ГРУПА В ПРОЄКТІ REMARKET',
    'Курс «Тестувальник програмного забезпечення»',
    'Кваліфікаційний центр',
    'Для учасників бойових дій',
    'Для осіб з інвалідністю',
    'Антибулінгова програма',
  ]);
});

test('adds a comprehensive source-site directory', () => {
  const sourceLinks = html.match(/data-source-page=/g) ?? [];
  assert.ok(sourceLinks.length >= 55, `Expected at least 55 source links, found ${sourceLinks.length}`);

  includesAll([
    'Про заклад',
    'Освітні послуги',
    'Слухачам',
    'Роботодавцям',
    'Презентація',
    'Фотогалерея',
    'Законодавчо-нормативна база',
    'Міжнародна діяльність',
    'Відгуки слухачів',
  ]);
});

test('keeps the expanded content navigable on a one-page site', () => {
  includesAll([
    'href="#services"',
    'href="#students"',
    'href="#employers"',
    'href="#resources"',
    'id="sourceSearch"',
    'aria-controls="sourceDirectory"',
  ]);
});
