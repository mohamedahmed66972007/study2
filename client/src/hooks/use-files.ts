import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { FileFormValues, PaginationState } from "@/lib/types";
import { FileWithRefs } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export const useEditFile = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, title, description, grade, semester, subject }: { 
      id: number, 
      title: string, 
      description: string,
      grade?: string,
      semester?: string,
      subject?: string
    }) => {
      const response = await apiRequest("PATCH", `/api/files/${id}`, { title, description, grade, semester, subject });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "فشل في تعديل الملف");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/files"] });
      toast({
        title: "تم تعديل الملف بنجاح",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "فشل في تعديل الملف",
        description: "حدث خطأ أثناء تعديل الملف",
        variant: "destructive",
      });
    },
  });
};

export const useFiles = (params: GetFilesParams) => {
  const { subject, grade, semester, search, page = 1, pageSize = ITEMS_PER_PAGE } = params;

  const endpoint = `/api/files?${new URLSearchParams({
    ...(subject && { subject }),
    ...(grade && { grade }),
    ...(semester && { semester }),
    ...(search && { search }),
    page: page.toString(),
    pageSize: pageSize.toString(),
  })}`;

  return useQuery({
    queryKey: ["/api/files", subject, grade, semester, search, page, pageSize],
    queryFn: async () => {
      const response = await apiRequest("GET", endpoint);
      const data = await response.json();
      return data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0
  });
};

export const useUploadFile = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: FormData) => {
      try {
        const response = await fetch("/api/files", {
          method: "POST",
          body: data,
          credentials: "include"
        });

        const responseData = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("يرجى تسجيل الدخول أولاً");
          }
          throw new Error(responseData.message || "فشل في رفع الملف");
        }

        return responseData;
      } catch (error: any) {
        throw new Error(error.message || "فشل في رفع الملف");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/files"] });
      toast({
        title: "تم رفع الملف بنجاح",
        description: "تم إضافة الملف إلى قاعدة البيانات",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "فشل في رفع الملف",
        description: error.message || "حدث خطأ أثناء رفع الملف",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteFile = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (fileId: number) => {
      await apiRequest("DELETE", `/api/files/${fileId}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/files"] });
      toast({
        title: "تم حذف الملف بنجاح",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "فشل في حذف الملف",
        description: "حدث خطأ أثناء حذف الملف",
        variant: "destructive",
      });
    },
  });
};