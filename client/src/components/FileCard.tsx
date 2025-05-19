import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Download, Trash, Edit } from "lucide-react";
import { SUBJECTS, getGradeById, getSemesterById, formatDate } from "@/lib/constants";
import { downloadFile, viewFile } from "@/lib/utils/fileUtils";
import { useDeleteFile, useEditFile } from "@/hooks/use-files";
import { FileWithStats } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FileCardProps {
  file: FileWithStats;
  isAdmin?: boolean;
}

const FileCard: React.FC<FileCardProps> = ({ file, isAdmin }) => {
  const deleteFile = useDeleteFile();
  const editFile = useEditFile();
  const subject = SUBJECTS.find(s => s.id === file.subject);
  const grade = getGradeById(file.grade);
  const semester = getSemesterById(file.semester);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editTitle, setEditTitle] = useState(file.title);
  const [editDescription, setEditDescription] = useState(file.description);
  const [editSubject, setEditSubject] = useState(file.subject);
  const [editGrade, setEditGrade] = useState(file.grade);
  const [editSemester, setEditSemester] = useState(file.semester);

  if (!subject) return null;

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteFile.mutate(file.id);
    setShowDeleteDialog(false);
  };

  const handleDownload = () => {
    downloadFile(file);
  };

  const handleView = () => {
    viewFile(file);
  };

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await editFile.mutate({ 
      id: file.id, 
      title: editTitle, 
      description: editDescription,
      subject: editSubject,
      grade: editGrade,
      semester: editSemester
    });
    setShowEditDialog(false);
  };

  return (
    <div className={`subject-card bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-${subject.color}`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full bg-${subject.color}/10 text-${subject.color}`}>
              {subject.name}
            </span>
            {grade && (
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800 mr-1">
                {grade.name}
              </span>
            )}
            {semester && (
              <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800 mr-1">
                {semester.name}
              </span>
            )}
          </div>
          {isAdmin && (
            <>
              <div className="admin-controls flex space-x-2 space-x-reverse">
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:bg-red-50 p-1 rounded-full"
                  title="حذف"
                  disabled={deleteFile.isPending}
                >
                  <Trash className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowEditDialog(true)}
                  className="text-blue-500 hover:bg-blue-50 p-1 rounded-full"
                  title="تعديل"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>تأكيد الحذف</DialogTitle>
                    <DialogDescription>
                      هل أنت متأكد من حذف هذا الملف؟ لا يمكن التراجع عن هذا الإجراء.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                      إلغاء
                    </Button>
                    <Button variant="destructive" onClick={confirmDelete}>
                      حذف
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>تعديل الملف</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="editTitle">العنوان</Label>
                      <Input
                        id="editTitle"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editDescription">الوصف</Label>
                      <Textarea
                        id="editDescription"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="subject">المادة</Label>
                      <Select value={editSubject} onValueChange={setEditSubject}>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="اختر المادة..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="arabic">اللغة العربية</SelectItem>
                          <SelectItem value="english">اللغة الإنجليزية</SelectItem>
                          <SelectItem value="math">الرياضيات</SelectItem>
                          <SelectItem value="biology">الأحياء</SelectItem>
                          <SelectItem value="chemistry">الكيمياء</SelectItem>
                          <SelectItem value="physics">الفيزياء</SelectItem>
                          <SelectItem value="islamic">التربية الإسلامية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="grade">الصف</Label>
                      <Select value={editGrade} onValueChange={setEditGrade}>
                        <SelectTrigger id="grade">
                          <SelectValue placeholder="اختر الصف..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">الصف العاشر</SelectItem>
                          <SelectItem value="11">الصف الحادي عشر</SelectItem>
                          <SelectItem value="12">الصف الثاني عشر</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="semester">الفصل</Label>
                      <Select value={editSemester} onValueChange={setEditSemester}>
                        <SelectTrigger id="semester">
                          <SelectValue placeholder="اختر الفصل..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">الفصل الأول</SelectItem>
                          <SelectItem value="2">الفصل الثاني</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button type="submit">حفظ التغييرات</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>

        <h3 className="text-lg font-bold mt-2">{file.title}</h3>
        <p className="text-gray-600 mt-1 text-sm">{file.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-gray-500 text-sm">
            <span className="material-icons-outlined text-sm ml-1">calendar_today</span>
            <span>{formatDate(file.uploadDate)}</span>
          </div>
        </div>

        <div className="flex mt-4 space-x-2 space-x-reverse">
          <Button
            onClick={handleView}
            variant="outline"
            className="flex-1 text-sm text-gray-800"
          >
            <Eye className="w-4 h-4 ml-1" />
            عرض
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1 text-sm bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Download className="w-4 h-4 ml-1" />
            تحميل
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
