import SpaceList from '@/components/SpaceList';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import React from 'react'

const sessions = () => {
    return (
        <AuthenticatedLayout>
            <SpaceList />
        </AuthenticatedLayout>
    )
}

export default sessions
export const Component = sessions;