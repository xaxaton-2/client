<script setup lang="ts">
import { Col, Flex, LayoutFooter, Space, Typography } from 'ant-design-vue';
import { OhVueIcon } from 'oh-vue-icons';
</script>

<template>
  <LayoutFooter class="footer">
    <Flex
      :gutter="24"
      justify="space-between"
    >
      <Col :span="8">
        <Flex vertical>
          <Typography>Политика конфиденциальности</Typography>
          <Typography>Условия использования сайта</Typography>
        </Flex>
      </Col>

      <Col :span="8">
        <Flex
          align="center"
          vertical
        >
          <Typography>ООО СОЗНАНИЕ</Typography>

          <Typography>
            460048, Оренбургская область, г Оренбург, Томилинская ул, д. 238, помещ. 2
          </Typography>

          <Typography>soznanie@mail.ru</Typography>

          <Space class="social">
            <OhVueIcon
              :scale="1.5"
              name="bi-telegram"
              fill="#229bd6"
            />

            <OhVueIcon
              :scale="1.5"
              name="co-vk"
              fill="#0073f7"
            />

            <OhVueIcon
              :scale="1.5"
              name="bi-whatsapp"
              fill="#40e15d"
            />
          </Space>
        </Flex>
      </Col>

      <Col :span="8">
        <Flex
          align="end"
          vertical
        >
          <Typography>О нас</Typography>
          <Typography>Реклама</Typography>
          <Typography>Партнеры</Typography>
        </Flex>
      </Col>
    </Flex>
  </LayoutFooter>
</template>

<style scoped lang="scss">
.footer {
  padding: 16px;
  background-color: $primary;

  .ant-typography {
    color: $white;
  }
}

.social {
  :deep(.ant-space-item) {
    padding: 4px;
    margin-top: 8px;
    background-color: $white;
    border-radius: 8px;
  }
}
</style>
