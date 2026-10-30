import { STACK_GROUPS } from './profile';
import { LOG_ENTRIES } from './services/log-entries';

describe('profile', () => {
  it('cada tecnología de los grupos aparece en el stack de alguna entrada', () => {
    const used = new Set(LOG_ENTRIES.flatMap((e) => e.stack));
    const unused = STACK_GROUPS.flatMap((g) => g.techs).filter((t) => !used.has(t));
    expect(unused).toEqual([]);
  });

  it('cada entrada project tiene sha y evidence', () => {
    const incomplete = LOG_ENTRIES.filter(
      (e) => e.kind === 'project' && (!e.sha || !e.evidence),
    ).map((e) => e.id);
    expect(incomplete).toEqual([]);
  });
});
