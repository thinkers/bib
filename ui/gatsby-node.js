const axios = require('axios');


const getRepositoryData = async () => {
    return axios.get(`${process.env.API_URL}/magazines`);
};


exports.createPages = async ({ actions: { createPage } }) => {

    let repositories = await getRepositoryData();
    if (repositories.data.status) {
        repositories = repositories.data.data;
    } else {
        // TODO error 
        console.error("NO DATA RETRIEVED")
    }
    // Create a page that lists all repositories.
    createPage({
        path: `/`,
        component: require.resolve('./src/templates/all-repositories.js'),
        context: { repositories }
    });

    // Create a page for each repository.
    repositories.forEach(repository => {
        createPage({
            path: `/magazine/${repository._title}`,
            component: require.resolve('./src/templates/repository.js'),
            context: { repository }
        });
    });
};
