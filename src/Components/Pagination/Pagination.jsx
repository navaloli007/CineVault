const Pagination = (props) => {
  const { previousPageFn, nextPageFn, pageNumber } = props;
  return (
    <div className="flex justify-center items-center h-[50px] text-white bg-gray-400 mt-8">
      <div onClick={previousPageFn} className="px-8 cursor-pointer">
        Prev
      </div>
      <div>{pageNumber}</div>
      <div onClick={nextPageFn} className="px-8 cursor-pointer">
        Next
      </div>
    </div>
  );
};

export default Pagination;
