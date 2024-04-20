import { computed } from 'vue';
import { useDepartmentsStore } from '@/store/departments';
import { useFacultiesStore } from '@/store/faculties';
import { useGroupsStore } from '@/store/groups';
import { useStudentsStore } from '@/store/students';
import { useUniversitiesStore } from '@/store/universities';

export const useStudent = (id: number) => {
  const universitiesStore = useUniversitiesStore();
  const facultiesStore = useFacultiesStore();
  const departmentsStore = useDepartmentsStore();
  const groupsStore = useGroupsStore();
  const studentsStore = useStudentsStore();

  const student = computed(() => studentsStore.studentsMap[id]);

  const group = computed(() => groupsStore.groupsMap[student.value.groupId]);

  const department = computed(() => departmentsStore.departmentsMap[group.value.departmentId]);

  const faculty = computed(() => facultiesStore.facultiesMap[department.value.facultyId]);

  const university = computed(() => universitiesStore.universitiesMap[faculty.value.universityId]);

  return {
    student,
    group,
    department,
    faculty,
    university,
  };
};
