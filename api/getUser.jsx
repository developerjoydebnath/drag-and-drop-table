'use client';

import { axiosInstance } from '@/utils/axios';

export const getUser = () => {
    (async () => {
        const res = await axiosInstance.get('/users');
        console.log(res);
        return res?.data?.users;
    })();
};
