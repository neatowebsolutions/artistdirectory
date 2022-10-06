const slugify = require('slugify');
const models = require('../models');

const getKeywords = async (model, keywords) => {
  const promises = keywords.map(async (keyword) => {
    const lowerCaseKeyword = keyword.toLowerCase();
    const existing = await model.findOne({ name: lowerCaseKeyword });
    if (!existing) {
      const newKeyword = await model.create({
        name: lowerCaseKeyword,
        slug: slugify(lowerCaseKeyword)
      });
      return newKeyword.name;
    }
    return existing.name;
  });
  return await Promise.all(promises);
};

const parseKeywords = async (skills, tags, categories) => {
  const Skill = await models.get('Skill');
  const Tag = await models.get('Tag');
  const Category = await models.get('Category');

  const [skillsParsed, tagsParsed, categoriesParsed] = await Promise.all([
    getKeywords(Skill, skills),
    getKeywords(Tag, tags),
    getKeywords(Category, categories)
  ]);

  return [skillsParsed, tagsParsed, categoriesParsed];
};

module.exports = parseKeywords;
