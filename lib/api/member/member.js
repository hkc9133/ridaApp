import client from '../client';

export const selectCompany = (id) =>
    client.get(`/company/selectCompany?companyId=${id}`);
