using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBookShopProject.Data.Dtos
{
    public class PaginationMetadata
    {
        public PaginationMetadata(int totalcount, int currentPage, int itemsPerPage)
        {
            TotalCount = totalcount;
            CurrentPage = currentPage;
            TotalPages = (int)Math.Ceiling(totalcount / (double)itemsPerPage);

        }
        public int CurrentPage { get; private set; }
        public int TotalCount { get; private set; }
        public int TotalPages { get; private set; }
        public bool HasPrevious => CurrentPage > 1;
        public bool HasNext => CurrentPage < TotalPages;
    }
}
