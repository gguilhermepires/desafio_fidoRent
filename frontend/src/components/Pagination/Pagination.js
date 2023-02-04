const Pagination = props => {
    return <div>
        <div style={{ display: 'block' }}>
            {Array(props.totalPage).fill('').map((_, index) => {
                return <button key={index}
                    onClick = {() => { props.onClick(index) }}
                disabled = { index === props.currentPage -1}
                >{index + 1}</button>
            })
            }
        </div>
    </div>
}

export default Pagination;
