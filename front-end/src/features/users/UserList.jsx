import React from 'react'
import { useGetUsersQuery } from './usersApiSlices'
import User from './User'

const UserList = () => {
    const { data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()
    let content

    if (isLoading) content = <p>Loading..</p>
    if (isError) {
        content = <p className={isError ? 'errmsg' : 'offscreen'}>{error?.data.message}</p>
    }
    if (isSuccess) {
        const { ids } = users
        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null
        content = (
            <table className='table, table--users'>
                <thead className='table__thead'>
                    <tr>
                        <th scope='col' className='table__th user__username'>Username</th>
                        <th scope='col' className='table__th user__roles'>Roles</th>
                        <th scope='col' className='table__th user__edit'>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }
    return content
}

export default UserList