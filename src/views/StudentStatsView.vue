<script setup lang="ts">
import { computed } from 'vue';
import { Bar, Radar } from 'vue-chartjs';
import { Card, Flex, TypographyTitle } from 'ant-design-vue';
import dayjs from 'dayjs';

const data = computed(() => {
  const labels = [];
  const bar = [];
  const radar = [];

  const date = dayjs().subtract(30, 'day');
  let total = 0;

  for (let i = 0; i < 30; i++) {
    labels.push(date.add(i + 1, 'day').format('D MMM'));
    const value = Math.floor(Math.random() * 10);
    total += value;
    bar.push(total);
    radar.push(value);
  }

  return {
    bar: {
      labels,
      datasets: [{ data: bar }],
    },
    radar: {
      labels,
      datasets: [{ data: radar }],
    },
  };
});

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};
</script>

<template>
  <Card>
    <Flex
      gap="middle"
      vertical
    >
      <TypographyTitle
        :level="5"
        class="title"
      >
        Баллы по датам
      </TypographyTitle>

      <Bar
        :data="data.bar"
        :options="options"
      />

      <Radar
        :data="data.radar"
        :options="options"
      />
    </Flex>
  </Card>
</template>

<style scoped lang="scss">
.title {
  margin: 0;
  text-align: center;
}
</style>
