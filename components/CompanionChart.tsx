import _ from "lodash";
import { Box, Center, Text } from "native-base";
import React from "react";
import { ProgressChart } from "react-native-chart-kit";
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes";

interface Props {
  data: { name: string; value: number | never }[];
}

export default function CompanionChart({ data }: Props) {
  const weights = _.times(data.length, (i) => i + 1).reverse();
  const _data = {
    labels: data.map((p) => p.name),
    data: data.map((p, i) => (p.value / 100) * weights[i]),
  };

  const chartConfig: ChartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 0.8) => `rgba(252,165,165, ${opacity})`,
  };

  return (
    <Box>
      <Text fontSize="3xl" fontWeight="semibold" color="coolGray.50" pb={3}>
        Companionship
      </Text>
      <Center>
        <ProgressChart
          data={_data}
          width={300}
          height={(300 * 2) / 3}
          chartConfig={chartConfig}
        />
      </Center>
    </Box>
  );
}
