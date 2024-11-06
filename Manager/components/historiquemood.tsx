import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface Categories {
  positive: number;
  neutral: number;
  negative: number;
}

const MoodHistoryDetails = ({ categories }: { categories: Categories }) => {
  return (
    <View style={styles.moodsContainer}>
      <View style={[styles.moodRectangle, { backgroundColor: '#A8D5BA', width: `${categories.positive}%` }]}>
        <Text style={styles.moodText}>{categories.positive}%</Text>
      </View>
      <View style={[styles.moodRectangle, { backgroundColor: '#F4A261', width: `${categories.neutral}%` }]}>
        <Text style={styles.moodText}>{categories.neutral}%</Text>
      </View>
      <View style={[styles.moodRectangle, { backgroundColor: '#E76F51', width: `${categories.negative}%` }]}>
        <Text style={styles.moodText}>{categories.negative}%</Text>
      </View>
    </View>
  );
};

const WeekHistory = ({
  week,
  categories,
  expanded,
  toggleExpand,
}: {
  week: string;
  categories: Categories;
  expanded: boolean;
  toggleExpand: () => void;
}) => {
  const dominantMood = getDominantMood(categories);

  return (
    <View style={styles.weekContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.weekHeader}>
        <Text style={styles.weekText}>{week}</Text>
        <View style={[styles.kpiContainer, { backgroundColor: dominantMood.color }]}>
          <Text style={styles.kpiText}>{dominantMood.label}</Text>
        </View>
        <AntDesign name={expanded ? 'up' : 'down'} size={16} color="black" />
      </TouchableOpacity>
      {expanded && <MoodHistoryDetails categories={categories} />}
    </View>
  );
};

const getDominantMood = (categories: Categories) => {
  const maxPercentage = Math.max(categories.positive, categories.neutral, categories.negative);
  if (maxPercentage === categories.positive) {
    return { label: 'Positif', color: '#A8D5BA' };
  } else if (maxPercentage === categories.neutral) {
    return { label: 'Neutre', color: '#F4A261' };
  } else {
    return { label: 'Négatif', color: '#E76F51' };
  }
};

const MonthHistory = ({
  month,
  isSelected,
  onSelect,
}: {
  month: string;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.monthHeader}>
      <Text style={[styles.monthText, isSelected && styles.selectedMonthText]}>{month}</Text>
    </TouchableOpacity>
  );
};

export default function MoodHistorySection() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<{ [key: string]: boolean }>({});

  // Données pour chaque année et mois
  const moodHistoryByYear = [
    {
      year: '2023',
      months: [
        {
          month: 'Janvier',
          weeks: [
            { week: 'S.1', categories: { positive: 25, neutral: 55, negative: 20 } },
            { week: 'S.2', categories: { positive: 45, neutral: 35, negative: 20 } },
            { week: 'S.3', categories: { positive: 60, neutral: 20, negative: 20 } },
            { week: 'S.4', categories: { positive: 70, neutral: 15, negative: 15 } },
          ],
        },
        {
          month: 'Février',
          weeks: [
            { week: 'S.1', categories: { positive: 30, neutral: 50, negative: 20 } },
            { week: 'S.2', categories: { positive: 40, neutral: 45, negative: 15 } },
            { week: 'S.3', categories: { positive: 50, neutral: 35, negative: 15 } },
            { week: 'S.4', categories: { positive: 65, neutral: 25, negative: 10 } },
          ],
        },
        {
          month: 'Mars',
          weeks: [
            { week: 'S.1', categories: { positive: 35, neutral: 45, negative: 20 } },
            { week: 'S.2', categories: { positive: 50, neutral: 40, negative: 10 } },
            { week: 'S.3', categories: { positive: 60, neutral: 30, negative: 10 } },
            { week: 'S.4', categories: { positive: 55, neutral: 35, negative: 10 } },
          ],
        },
        {
          month: 'Avril',
          weeks: [
            { week: 'S.1', categories: { positive: 40, neutral: 45, negative: 15 } },
            { week: 'S.2', categories: { positive: 55, neutral: 35, negative: 10 } },
            { week: 'S.3', categories: { positive: 65, neutral: 20, negative: 15 } },
            { week: 'S.4', categories: { positive: 60, neutral: 25, negative: 15 } },
          ],
        },
        {
          month: 'Mai',
          weeks: [
            { week: 'S.1', categories: { positive: 45, neutral: 40, negative: 15 } },
            { week: 'S.2', categories: { positive: 50, neutral: 35, negative: 15 } },
            { week: 'S.3', categories: { positive: 55, neutral: 30, negative: 15 } },
            { week: 'S.4', categories: { positive: 70, neutral: 20, negative: 10 } },
          ],
        },
        {
          month: 'Juin',
          weeks: [
            { week: 'S.1', categories: { positive: 60, neutral: 30, negative: 10 } },
            { week: 'S.2', categories: { positive: 65, neutral: 25, negative: 10 } },
            { week: 'S.3', categories: { positive: 55, neutral: 35, negative: 10 } },
            { week: 'S.4', categories: { positive: 75, neutral: 15, negative: 10 } },
          ],
        },
        {
          month: 'Juillet',
          weeks: [
            { week: 'S.1', categories: { positive: 50, neutral: 40, negative: 10 } },
            { week: 'S.2', categories: { positive: 65, neutral: 30, negative: 5 } },
            { week: 'S.3', categories: { positive: 60, neutral: 35, negative: 5 } },
            { week: 'S.4', categories: { positive: 70, neutral: 25, negative: 5 } },
          ],
        },
        {
          month: 'Août',
          weeks: [
            { week: 'S.1', categories: { positive: 55, neutral: 35, negative: 10 } },
            { week: 'S.2', categories: { positive: 60, neutral: 30, negative: 10 } },
            { week: 'S.3', categories: { positive: 75, neutral: 15, negative: 10 } },
            { week: 'S.4', categories: { positive: 65, neutral: 25, negative: 10 } },
          ],
        },
        {
          month: 'Septembre',
          weeks: [
            { week: 'S.1', categories: { positive: 40, neutral: 50, negative: 10 } },
            { week: 'S.2', categories: { positive: 55, neutral: 35, negative: 10 } },
            { week: 'S.3', categories: { positive: 70, neutral: 25, negative: 5 } },
            { week: 'S.4', categories: { positive: 65, neutral: 30, negative: 5 } },
          ],
        },
        {
          month: 'Octobre',
          weeks: [
            { week: 'S.1', categories: { positive: 50, neutral: 35, negative: 15 } },
            { week: 'S.2', categories: { positive: 65, neutral: 25, negative: 10 } },
            { week: 'S.3', categories: { positive: 60, neutral: 30, negative: 10 } },
            { week: 'S.4', categories: { positive: 75, neutral: 20, negative: 5 } },
          ],
        },
        {
          month: 'Novembre',
          weeks: [
            { week: 'S.1', categories: { positive: 45, neutral: 40, negative: 15 } },
            { week: 'S.2', categories: { positive: 60, neutral: 35, negative: 5 } },
            { week: 'S.3', categories: { positive: 65, neutral: 30, negative: 5 } },
            { week: 'S.4', categories: { positive: 70, neutral: 25, negative: 5 } },
          ],
        },
        {
          month: 'Décembre',
          weeks: [
            { week: 'S.1', categories: { positive: 50, neutral: 40, negative: 10 } },
            { week: 'S.2', categories: { positive: 55, neutral: 35, negative: 10 } },
            { week: 'S.3', categories: { positive: 60, neutral: 30, negative: 10 } },
            { week: 'S.4', categories: { positive: 70, neutral: 20, negative: 10 } },
          ],
        },
      ],
    },
    {
      year: '2024',
      months: [
        {
          month: 'Janvier',
          weeks: [
            { week: 'S.1', categories: { positive: 35, neutral: 45, negative: 20 } },
            { week: 'S.2', categories: { positive: 55, neutral: 35, negative: 10 } },
            { week: 'S.3', categories: { positive: 50, neutral: 40, negative: 10 } },
            { week: 'S.4', categories: { positive: 65, neutral: 25, negative: 10 } },
          ],
        },
        {
          month: 'Février',
          weeks: [
            { week: 'S.1', categories: { positive: 45, neutral: 40, negative: 15 } },
            { week: 'S.2', categories: { positive: 60, neutral: 30, negative: 10 } },
            { week: 'S.3', categories: { positive: 50, neutral: 35, negative: 15 } },
            { week: 'S.4', categories: { positive: 55, neutral: 30, negative: 15 } },
          ],
        },
        {
          month: 'Mars',
          weeks: [
            { week: 'S.1', categories: { positive: 40, neutral: 45, negative: 15 } },
            { week: 'S.2', categories: { positive: 50, neutral: 40, negative: 10 } },
            { week: 'S.3', categories: { positive: 65, neutral: 30, negative: 5 } },
            { week: 'S.4', categories: { positive: 70, neutral: 25, negative: 5 } },
          ],
        },
      ],
    },
  ];

  const currentYearData = moodHistoryByYear.find((yearData) => yearData.year === selectedYear);
  const selectedMonthData = currentYearData?.months.find((monthData) => monthData.month === selectedMonth);

  const toggleWeekExpand = (week: string) => {
    setExpandedWeeks((prevState) => ({
      ...prevState,
      [week]: !prevState[week],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.yearText}>Années</Text>
        <TouchableOpacity onPress={() => setSelectedYear(selectedYear === '2024' ? '2023' : '2024')}>
          <Text style={styles.selectedYear}>{selectedYear}</Text>
        </TouchableOpacity>
        <AntDesign name="down" size={16} color="black" />
      </View>

      <View style={styles.monthAndWeekContainers}>
        <ScrollView style={styles.monthList}>
          <Text style={styles.monthListTitle}>Mois</Text>
          {currentYearData?.months.map((monthData, index) => (
            <MonthHistory
              key={index}
              month={monthData.month}
              isSelected={selectedMonth === monthData.month}
              onSelect={() => {
                setSelectedMonth(monthData.month);
                setExpandedWeeks({});
              }}
            />
          ))}
        </ScrollView>
        <ScrollView style={styles.weeksContainer}>
          <Text style={styles.weekListTitle}>Semaines</Text>
          {selectedMonthData?.weeks.map((weekData, index) => (
            <WeekHistory
              key={index}
              week={weekData.week}
              categories={weekData.categories}
              expanded={expandedWeeks[weekData.week] || false}
              toggleExpand={() => toggleWeekExpand(weekData.week)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EAE0FF',
    padding: 14,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  yearText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A3A8A',
  },
  selectedYear: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A3DA8',
  },
  monthAndWeekContainers: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 5,
  },
  monthList: {
    flex: 0.4,
    backgroundColor: '#C4C4C4',
    paddingVertical: 10,
    paddingHorizontal: 1,
    borderRadius: 15,
    marginRight: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  monthHeader: {
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  monthListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  monthText: {
    color: '#4A4A4A',
    fontSize: 18,
  },
  selectedMonthText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#4A3DA8',
  },
  weeksContainer: {
    flex: 4,
    paddingVertical: 10,
    paddingHorizontal: 1,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  weekListTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 15,
  },
  weekContainer: {
    backgroundColor: '#F1F1F1',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    width: '100%',
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekText: {
    fontSize: 18,
    color: '#4A4A4A',
  },
  kpiContainer: {
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A8D5BA',
    minWidth: 30,
    marginHorizontal: 5,
  },
  kpiText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  moodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '100%',
  },
  moodRectangle: {
    flex: 1, // Prend un espace égal pour chaque moodRectangle
    height: '100%', // Remplit entièrement la hauteur de moodsContainer
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1, // Espacement minimal entre chaque moodRectangle
  },
  moodText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
