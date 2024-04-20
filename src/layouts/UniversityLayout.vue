<script setup lang="ts">
import { computed, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CalendarOutlined, IdcardOutlined, ReadOutlined } from '@ant-design/icons-vue';
import { Card, Flex, Menu, MenuProps } from 'ant-design-vue';
import { MenuClickEventHandler } from 'ant-design-vue/es/menu/src/interface';
import BaseContainer from '@/components/base/BaseContainer.vue';

const menu: MenuProps['items'] = [
  {
    key: 'profile',
    icon: () => h(IdcardOutlined),
    label: 'Профиль',
  },
  {
    key: 'events',
    icon: () => h(CalendarOutlined),
    label: 'Мероприятия',
  },
  {
    key: 'requests',
    icon: () => h(ReadOutlined),
    label: 'Заявки',
  },
];

const route = useRoute();
const router = useRouter();

const key = computed(() => {
  return (route.name || '').toString().replace('university-', '');
});

const onMenuClick: MenuClickEventHandler = (e) => {
  router.push({
    name: `university-${e.key}`,
    params: {
      id: route.params.id,
    },
  });
};
</script>

<template>
  <Flex
    class="layout"
    :gap="24"
  >
    <Card class="side">
      <Menu
        :selected-keys="[key]"
        :items="menu"
        mode="vertical"
        @click="onMenuClick"
      />
    </Card>

    <BaseContainer :width="600">
      <RouterView />
    </BaseContainer>
  </Flex>
</template>

<style scoped lang="scss">
.layout {
  flex-grow: 1;
  padding: 0 24px;
}

.side {
  width: 200px;

  :deep(.ant-card-body) {
    padding: 12px;
  }

  .ant-menu {
    border: none;
  }
}
</style>
