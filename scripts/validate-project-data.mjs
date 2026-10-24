import { readPortfolioData, validatePortfolioData } from './content-data.mjs';

const portfolio = await readPortfolioData();
const errors = validatePortfolioData(portfolio);
if (errors.length) {
  console.error('Portfolio content validation failed:');
  for (const error of errors) console.error('- ' + error);
  process.exitCode = 1;
} else {
  const { collections } = portfolio;
  console.log(
    'Portfolio content valid: ' +
    collections.projects.length + ' projects, ' +
    collections.experiences.length + ' experiences, ' +
    collections.cases.length + ' cases, ' +
    collections.labs.length + ' labs, ' +
    collections.capabilities.length + ' capability groups.',
  );
}
