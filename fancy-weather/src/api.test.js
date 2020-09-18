import fetchMock from 'jest-fetch-mock';
import api from './api';

fetchMock.enableFetchMocks();

describe('api', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.doMock();
    });
    test('get background', async () => {
        fetchMock.mockResponse(async (req) => {
            if (req.url.startsWith('https://api.unsplash.com/photos/')) {
                return JSON.stringify({
                    id: '429vu4KJAvw',
                    created_at: '2018-12-30T18:07:24-05:00',
                    updated_at: '2020-05-14T01:38:00-04:00',
                    promoted_at: null,
                    width: 3992,
                    height: 2992,
                    color: '#0F73AE',
                    description: 'Aerial view of a beach cove along the Jurassic Coast.',
                    alt_description: 'blue sea',
                    urls: {
                        raw:
                            'https://images.unsplash.com/photo-1546211206-13a764676f6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjk4MDk5fQ',
                        full:
                            'https://images.unsplash.com/photo-1546211206-13a764676f6a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjk4MDk5fQ',
                        regular:
                            'https://images.unsplash.com/photo-1546211206-13a764676f6a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjk4MDk5fQ',
                        small:
                            'https://images.unsplash.com/photo-1546211206-13a764676f6a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjk4MDk5fQ',
                        thumb:
                            'https://images.unsplash.com/photo-1546211206-13a764676f6a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjk4MDk5fQ',
                    },
                    links: {
                        self: 'https://api.unsplash.com/photos/429vu4KJAvw',
                        html: 'https://unsplash.com/photos/429vu4KJAvw',
                        download: 'https://unsplash.com/photos/429vu4KJAvw/download',
                        download_location: 'https://api.unsplash.com/photos/429vu4KJAvw/download',
                    },
                    categories: [],
                    likes: 38,
                    liked_by_user: false,
                    current_user_collections: [],
                    sponsorship: null,
                    user: {
                        id: '4BYRpKXv3o0',
                        updated_at: '2020-05-12T16:49:51-04:00',
                        username: '_louisreed',
                        name: 'Louis Reed',
                        first_name: 'Louis',
                        last_name: 'Reed',
                        twitter_username: '_LouisReed',
                        portfolio_url: 'https://www.louisreed.co.uk',
                        bio:
                            'For more professional images please visit: wirestock.io/louis.reed/portfolio',
                        location: null,
                        links: {
                            self: 'https://api.unsplash.com/users/_louisreed',
                            html: 'https://unsplash.com/@_louisreed',
                            photos: 'https://api.unsplash.com/users/_louisreed/photos',
                            likes: 'https://api.unsplash.com/users/_louisreed/likes',
                            portfolio: 'https://api.unsplash.com/users/_louisreed/portfolio',
                            following: 'https://api.unsplash.com/users/_louisreed/following',
                            followers: 'https://api.unsplash.com/users/_louisreed/followers',
                        },
                        profile_image: {
                            small:
                                'https://images.unsplash.com/profile-1532019023716-da3f551a6034?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
                            medium:
                                'https://images.unsplash.com/profile-1532019023716-da3f551a6034?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64',
                            large:
                                'https://images.unsplash.com/profile-1532019023716-da3f551a6034?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128',
                        },
                        instagram_username: null,
                        total_collections: 13,
                        total_likes: 39,
                        total_photos: 100,
                        accepted_tos: true,
                    },
                    exif: {
                        make: 'DJI',
                        model: 'FC220',
                        exposure_time: '1/320',
                        aperture: '2.2',
                        focal_length: '4.7',
                        iso: 100,
                    },
                    location: {
                        title: 'S W Coast Path, Chickerell, Weymouth DT4, UK, United Kingdom',
                        name: 'S W Coast Path, Chickerell, Weymouth DT4, UK, United Kingdom',
                        city: 'Chickerell',
                        country: 'United Kingdom',
                        position: {
                            latitude: 50.59162531,
                            longitude: -2.48542139,
                        },
                    },
                    views: 121687,
                    downloads: 1390,
                });
            }
            throw new Error('bad url');
        });
        await expect(api.getBackground('nature')).resolves.toBe(
            'https://images.unsplash.com/photo-1546211206-13a764676f6a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjk4MDk5fQ'
        );
    });
});
