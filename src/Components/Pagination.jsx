function Pagination({ total, current, changePage }) {
  let pages = new Array(total).fill(0).map((a, i) => (
    <button
      data-testid="page-btn"
      onClick={() => changePage(i + 1)}
      disabled={current === i + 1}
      key={i + 1}
    >
      {i + 1}
    </button>
  ));
  return <div>{pages}</div>;
}

export default Pagination;
