<script setup lang="ts">
import { Card, Flex, List, ListItem, Typography, TypographyTitle } from 'ant-design-vue';
import BaseContainer from '@/components/base/BaseContainer.vue';

const services = [
  'Разработка образовательных информационных систем.',
  'Системная интеграция.',
  'Консалтинг по программному обеспечению.',
  'Сервисная поддержка.',
  'Аутсорсинг',
];

const features = [
  'Индивидуальный подход к каждому клиенту.',
  'Простая интеграция и поддержка на всех этапах проекта.',
  'Высокий уровень надежности и защищенности информации.',
  'Предложение качественных и интуитивно понятных информационных продуктов.',
];

const offers = [
  'Информационные системы для образовательных учреждений всех уровней.',
  'Программное обеспечение для школ, колледжей, университетов и других образовательных организаций.',
];
</script>

<template>
  <BaseContainer>
    <Flex
      gap="large"
      vertical
    >
      <Card>
        <TypographyTitle :level="3">О проекте LifeCourse</TypographyTitle>

        <Typography>
          Российская компания "Сознание" является ведущим поставщиком инновационных информационных
          решений в области образования. Мы сотрудничаем как с государственными, так и с
          коммерческими организациями.
        </Typography>
      </Card>

      <Card>
        <List
          header="Наши услуги включают в себя"
          :data-source="services"
        >
          <template #renderItem="{ item }">
            <ListItem>{{ item }}</ListItem>
          </template>
        </List>
      </Card>

      <Card>
        <Typography>
          Мы специализируемся на создании комплексных интегрированных решений в области
          IT-инфраструктуры для образовательных учреждений всех уровней. Наша главная цель - решение
          как индивидуальных, так и глобальных проблем контроля и управления образовательными
          процессами, совершенствование образовательных методик и структур учебных заведений.
        </Typography>
      </Card>

      <Card>
        <List
          header="Преимущества работы с LifeCourse"
          :data-source="features"
        >
          <template #renderItem="{ item }">
            <ListItem>{{ item }}</ListItem>
          </template>
        </List>
      </Card>

      <Card>
        <List
          header="В частности, мы предлагаем"
          :data-source="offers"
        >
          <template #renderItem="{ item }">
            <ListItem>{{ item }}</ListItem>
          </template>
        </List>
      </Card>

      <Card>
        <Typography>
          Наши сотрудники обладают уникальным опытом в области проектирования, внедрения и
          сопровождения комплексных информационных систем. Мы стремимся к постоянному развитию и
          созданию инновационных продуктов для наших клиентов.
        </Typography>
      </Card>
    </Flex>
  </BaseContainer>
</template>
