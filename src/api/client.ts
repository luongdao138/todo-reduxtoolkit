import SanityClient from '@sanity/client';

const client = new SanityClient({
    projectId: 'hmu0fist',
    dataset: 'production',
});

export default client;
