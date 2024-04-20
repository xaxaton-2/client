import { computed } from 'vue';
import { useDepartmentsStore } from '@/store/departments';
import { useFacultiesStore } from '@/store/faculties';
import { useGroupsStore } from '@/store/groups';
import { useStudentsStore } from '@/store/students';
import { useUniversitiesStore } from '@/store/universities';

export const useUniversity = (id: number) => {
  const universitiesStore = useUniversitiesStore();
  const facultiesStore = useFacultiesStore();
  const departmentsStore = useDepartmentsStore();
  const groupsStore = useGroupsStore();
  const studentsStore = useStudentsStore();

  const university = computed(() => {
    return universitiesStore.universitiesMap[id];
  });

  const faculties = computed(() => {
    return facultiesStore.faculties.filter((faculty) => faculty.universityId === id);
  });

  const departments = computed(() => {
    return departmentsStore.departments.filter((department) => {
      const faculty = facultiesStore.facultiesMap[department.facultyId];
      return faculty.universityId === id;
    });
  });

  const groups = computed(() => {
    return groupsStore.groups.filter((group) => {
      const department = departmentsStore.departmentsMap[group.departmentId];
      const faculty = facultiesStore.facultiesMap[department.facultyId];
      return faculty.universityId === id;
    });
  });

  const students = computed(() => {
    return studentsStore.students.filter((student) => {
      const group = groupsStore.groupsMap[student.groupId];
      const department = departmentsStore.departmentsMap[group.departmentId];
      const faculty = facultiesStore.facultiesMap[department.facultyId];
      return faculty.universityId === id;
    });
  });

  return {
    university,
    faculties,
    departments,
    groups,
    students,
  };
};
