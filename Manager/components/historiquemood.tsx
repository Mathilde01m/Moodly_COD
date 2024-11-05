import React, { useState, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Types pour les props
interface Categories {
  positive: number;
  neutral: number;
  negative: number;
}

// Composant TitleComponent séparé
const TitleComponent = ({ title }: { title: string }) => {
  return <Text style={styles.sectionText}>{title}</Text>;
};

// Composant pour l'affichage détaillé des moods hebdomadaires
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

// Composant pour un bloc hebdomadaire avec KPI et détails des moods
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
        <TitleComponent title={week} />
        {!expanded && (
          <View style={[styles.kpiContainer, { backgroundColor: dominantMood.color }]}>
            <Text style={styles.kpiText}>{dominantMood.label}</Text>
          </View>
        )}
        <AntDesign name={expanded ? 'up' : 'down'} size={24} color="black" />
      </TouchableOpacity>
      {expanded && <MoodHistoryDetails categories={categories} />}
    </View>
  );
};

// Fonction utilitaire pour déterminer l'humeur dominante
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

// Composant pour la vue mensuelle
const MonthHistory = ({
  month,
  weeks,
}: {
  month: string;
  weeks: Array<{ week: string; categories: Categories }>;
}) => {
  const [expandedMonth, setExpandedMonth] = useState<boolean>(false);
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null);

  return (
    <View style={styles.monthContainer}>
      <TouchableOpacity onPress={() => setExpandedMonth(!expandedMonth)} style={styles.monthHeader}>
        <TitleComponent title={month} />
        <AntDesign name={expandedMonth ? 'up' : 'down'} size={24} color="black" />
      </TouchableOpacity>
      {expandedMonth && (
        <View>
          {weeks.map((weekData, index) => (
            <WeekHistory
              key={index}
              week={weekData.week}
              categories={weekData.categories}
              expanded={expandedWeek === weekData.week}
              toggleExpand={() => setExpandedWeek(expandedWeek === weekData.week ? null : weekData.week)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

// Composant pour la vue annuelle avec plusieurs mois
const YearHistory = ({ year, months }: { year: string; months: Array<{ month: string; weeks: Array<{ week: string; categories: Categories }> }> }) => {
  const [expandedYear, setExpandedYear] = useState<boolean>(false);

  return (
    <View style={styles.yearContainer}>
      <TouchableOpacity onPress={() => setExpandedYear(!expandedYear)} style={styles.yearHeader}>
        <TitleComponent title={year} />
        <AntDesign name={expandedYear ? 'up' : 'down'} size={24} color="black" />
      </TouchableOpacity>
      {expandedYear && (
        <View>
          {months.map((monthData, index) => (
            <MonthHistory key={index} month={monthData.month} weeks={monthData.weeks} />
          ))}
        </View>
      )}
    </View>
  );
};

// Composant principal pour l'historique des moods avec ScrollView pour scroller
export default function MoodHistorySection() {
  const moodHistoryByYear = [
    {
      year: '2023',
      months: [
        {
          month: 'Janvier',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 30, neutral: 50, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 40, neutral: 40, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 50, neutral: 30, negative: 20 } },
            { week: 'Semaine 4', categories: { positive: 60, neutral: 20, negative: 20 } },
          ],
        },
        {
          month: 'Février',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 35, neutral: 45, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 45, neutral: 35, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 55, neutral: 25, negative: 20 } },
            { week: 'Semaine 4', categories: { positive: 65, neutral: 15, negative: 20 } },
          ],
        },
        {
          month: 'Mars',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 50, neutral: 30, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 60, neutral: 25, negative: 15 } },
            { week: 'Semaine 3', categories: { positive: 55, neutral: 25, negative: 20 } },
            { week: 'Semaine 4', categories: { positive: 70, neutral: 20, negative: 10 } },
          ],
        },
        {
          month: 'Avril',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 40, neutral: 40, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 50, neutral: 35, negative: 15 } },
            { week: 'Semaine 3', categories: { positive: 60, neutral: 25, negative: 15 } },
            { week: 'Semaine 4', categories: { positive: 65, neutral: 20, negative: 15 } },
          ],
        },
        {
          month: 'Mai',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 45, neutral: 35, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 55, neutral: 30, negative: 15 } },
            { week: 'Semaine 3', categories: { positive: 60, neutral: 25, negative: 15 } },
            { week: 'Semaine 4', categories: { positive: 70, neutral: 20, negative: 10 } },
          ],
        },
        {
          month: 'Juin',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 50, neutral: 30, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 55, neutral: 25, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 65, neutral: 20, negative: 15 } },
            { week: 'Semaine 4', categories: { positive: 70, neutral: 15, negative: 15 } },
          ],
        },
        {
          month: 'Juillet',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 60, neutral: 30, negative: 10 } },
            { week: 'Semaine 2', categories: { positive: 70, neutral: 20, negative: 10 } },
            { week: 'Semaine 3', categories: { positive: 75, neutral: 15, negative: 10 } },
            { week: 'Semaine 4', categories: { positive: 80, neutral: 10, negative: 10 } },
          ],
        },
        {
          month: 'Août',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 65, neutral: 25, negative: 10 } },
            { week: 'Semaine 2', categories: { positive: 70, neutral: 20, negative: 10 } },
            { week: 'Semaine 3', categories: { positive: 75, neutral: 15, negative: 10 } },
            { week: 'Semaine 4', categories: { positive: 80, neutral: 10, negative: 10 } },
          ],
        },
        {
          month: 'Septembre',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 50, neutral: 30, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 55, neutral: 25, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 60, neutral: 25, negative: 15 } },
            { week: 'Semaine 4', categories: { positive: 65, neutral: 20, negative: 15 } },
          ],
        },
        {
          month: 'Octobre',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 45, neutral: 35, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 50, neutral: 30, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 55, neutral: 25, negative: 20 } },
            { week: 'Semaine 4', categories: { positive: 60, neutral: 25, negative: 15 } },
          ],
        },
        {
          month: 'Novembre',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 35, neutral: 45, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 40, neutral: 40, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 50, neutral: 30, negative: 20 } },
            { week: 'Semaine 4', categories: { positive: 60, neutral: 20, negative: 20 } },
          ],
        },
        {
          month: 'Décembre',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 35, neutral: 45, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 45, neutral: 35, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 55, neutral: 25, negative: 20 } },
            { week: 'Semaine 4', categories: { positive: 65, neutral: 15, negative: 20 } },
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
            { week: 'Semaine 1', categories: { positive: 30, neutral: 50, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 40, neutral: 40, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 50, neutral: 30, negative: 20 } },
            { week: 'Semaine 4', categories: { positive: 60, neutral: 20, negative: 20 } },
          ],
        },
        {
          month: 'Février',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 35, neutral: 45, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 45, neutral: 35, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 55, neutral: 25, negative: 20 } },
            { week: 'Semaine 4', categories: { positive: 65, neutral: 15, negative: 20 } },
          ],
        },
        {
          month: 'Mars',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 50, neutral: 30, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 60, neutral: 25, negative: 15 } },
            { week: 'Semaine 3', categories: { positive: 55, neutral: 25, negative: 20 } },
            { week: 'Semaine 4', categories: { positive: 70, neutral: 20, negative: 10 } },
          ],
        },
        {
          month: 'Avril',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 40, neutral: 40, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 50, neutral: 35, negative: 15 } },
            { week: 'Semaine 3', categories: { positive: 60, neutral: 25, negative: 15 } },
            { week: 'Semaine 4', categories: { positive: 65, neutral: 20, negative: 15 } },
          ],
        },
        {
          month: 'Mai',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 45, neutral: 35, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 55, neutral: 30, negative: 15 } },
            { week: 'Semaine 3', categories: { positive: 60, neutral: 25, negative: 15 } },
            { week: 'Semaine 4', categories: { positive: 70, neutral: 20, negative: 10 } },
          ],
        },
        {
          month: 'Juin',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 50, neutral: 30, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 55, neutral: 25, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 65, neutral: 20, negative: 15 } },
            { week: 'Semaine 4', categories: { positive: 70, neutral: 15, negative: 15 } },
          ],
        },
        {
          month: 'Juillet',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 60, neutral: 30, negative: 10 } },
            { week: 'Semaine 2', categories: { positive: 70, neutral: 20, negative: 10 } },
            { week: 'Semaine 3', categories: { positive: 75, neutral: 15, negative: 10 } },
            { week: 'Semaine 4', categories: { positive: 80, neutral: 10, negative: 10 } },
          ],
        },
        {
          month: 'Août',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 65, neutral: 25, negative: 10 } },
            { week: 'Semaine 2', categories: { positive: 70, neutral: 20, negative: 10 } },
            { week: 'Semaine 3', categories: { positive: 75, neutral: 15, negative: 10 } },
            { week: 'Semaine 4', categories: { positive: 80, neutral: 10, negative: 10 } },
          ],
        },
        {
          month: 'Septembre',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 50, neutral: 30, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 55, neutral: 25, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 60, neutral: 25, negative: 15 } },
            { week: 'Semaine 4', categories: { positive: 65, neutral: 20, negative: 15 } },
          ],
        },
        {
          month: 'Octobre',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 45, neutral: 35, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 50, neutral: 30, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 55, neutral: 25, negative: 20 } },
            { week: 'Semaine 4', categories: { positive: 60, neutral: 25, negative: 15 } },
          ],
        },
        {
          month: 'Novembre',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 35, neutral: 45, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 40, neutral: 40, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 50, neutral: 30, negative: 20 } },
            { week: 'Semaine 4', categories: { positive: 60, neutral: 20, negative: 20 } },
          ],
        },
        {
          month: 'Décembre',
          weeks: [
            { week: 'Semaine 1', categories: { positive: 35, neutral: 45, negative: 20 } },
            { week: 'Semaine 2', categories: { positive: 45, neutral: 35, negative: 20 } },
            { week: 'Semaine 3', categories: { positive: 55, neutral: 25, negative: 20 } },
            { week: 'Semaine 4', categories: { positive: 65, neutral: 15, negative: 20 } },
          ],
        },
      ],
    },
    // Ajoute ici d'autres années si nécessaire
  ];
  return (
    <ScrollView style={styles.historyContainer}>
      <TitleComponent title="Historique des Moods par Année" />
      {moodHistoryByYear.map((yearData, index) => (
        <YearHistory key={index} year={yearData.year} months={yearData.months} />
      ))}
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  historyContainer: {
    padding: 20,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weekContainer: {
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthContainer: {
    marginBottom: 20,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yearContainer: {
    marginBottom: 20,
    backgroundColor: '#DDE1E7',
    borderRadius: 10,
    padding: 10,
  },
  yearHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kpiContainer: {
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 30,
  },
  kpiText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  moodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  moodRectangle: {
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
