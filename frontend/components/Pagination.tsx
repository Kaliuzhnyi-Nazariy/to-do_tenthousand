import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PaginationComponent = ({ pages }: { pages: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = searchParams.get("page");

  useEffect(() => {
    if (!currentPage) {
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", "1");

      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [currentPage, pathname, router, searchParams]);

  const handlePagePagination = (page: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (pages < Number(page)) return;

    if (Number(page) == 0) return;

    params.set("page", page);

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination className="my-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              handlePagePagination(String(Number(currentPage) - 1))
            }
          />
        </PaginationItem>
        {Array.from({ length: pages }, (_, p) => {
          const numberPage = p + 1;
          return (
            <PaginationItem key={p}>
              <PaginationLink
                onClick={() => handlePagePagination(String(numberPage))}
              >
                {numberPage}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              handlePagePagination(String(Number(currentPage) + 1))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
