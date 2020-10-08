const faker = require("faker");

faker.locale = "en";
const languages = ["English", "German", "Spanish", "French", "Hebrew"];
const OFFLINE = "offline";
const ONLINE = "online";

// generating fake data
const advisors = new Array(100)
  .fill(null)
  .map(() => {
    const randomNumber = Math.random();
    const languagesCount = Math.floor(randomNumber * languages.length);
    const advisorLanguages = new Array(languagesCount)
      .fill(null)
      .map((i) => languages[Math.floor(Math.random() * languages.length)]);

    return {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      reviewsCount: faker.random.number(),
      avatar: faker.internet.avatar(),
      title: faker.lorem.sentence(),
      status: randomNumber < 0.5 ? OFFLINE : ONLINE,
      languages: [...new Set(advisorLanguages)],
    };
  })
  .sort((a, b) => {
    if (a.status === b.status) {
      return b.reviewsCount - a.reviewsCount;
    }
    return a.status === ONLINE ? -1 : 1;
  });

const getAdvisors = async (req, res) => {
  const limit = req.query.limit || 20;
  const name = req.query.name;
  const language = req.query.language;

  let filteredAdvisors = advisors.slice(0);

  if (name || language) {
    filteredAdvisors = advisors.slice(0).filter((advisor) => {
      const matchesName =
        !name || advisor.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
      const matchesLanguage =
        !language || advisor.languages.indexOf(language) !== -1;

      return matchesName && matchesLanguage;
    });
  }
  const advisorsResponse = filteredAdvisors.slice(0, limit - 1);

  setTimeout(() => {
    res.json({
      advisors: advisorsResponse,
      count: filteredAdvisors.length,
      hasMore: filteredAdvisors.length !== advisorsResponse.length,
    });
  }, 500);
};

const getLanguages = async (req, res) => {
  setTimeout(() => {
    res.json(languages);
  }, 500);
};

module.exports = { getAdvisors, getLanguages };
