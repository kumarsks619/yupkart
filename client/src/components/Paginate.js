import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ totalPages, pageNum, keyword = '', isAdmin = false }) => {
    return (
        // if total number of pages are more than 1, only then show the pagination
        totalPages > 1 && (
            <Pagination>
                {/* to create an array with values 0-(totalPages-1) */}
                {[...Array(totalPages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={
                            !isAdmin
                                ? keyword
                                    ? `/search/${keyword}/page/${x + 1}`
                                    : `/page/${x + 1}`
                                : `/admin/products-list/${x + 1}`
                        }
                    >
                        <Pagination.Item active={x + 1 === pageNum}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

export default Paginate
