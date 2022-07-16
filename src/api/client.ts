import SanityClient from '@sanity/client';

export const writeClient = new SanityClient({
    projectId: 'hmu0fist',
    dataset: 'production',
    token: 'skw3BBEpDe9YCkK8jYAkUOfn0B3peojtOMxCx8qsuTttQ7ATWK0uUXf0cM6VJxtlcaZ7324nIUlvCKWgPWpCowAT630Ui38SvfN7zKoRdsbUn1BnOgSqPmRmZRKvoRXzlFwEeYfNKLx8NKUpV5pUNBFP0f8ob8aW7srcUENzruD6X8AJ2kBn',
    useCdn: false,
});

export const readClient = new SanityClient({
    projectId: 'hmu0fist',
    dataset: 'production',
    useCdn: true,
});
