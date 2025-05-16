import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:dotenv/dotenv.dart';

class Struggles {
  final String? speakingRate;
  final String? speakingRateId;
  final String? speakingRateTitle;
  final String? vocalVariation;
  final String? vocalVariationId;
  final String? vocalVariationTitle;
  final String? silentRatio;
  final String? wordTheme;
  final String? wordThemeId;
  final String? wordThemeTitle;
  final String? fillerWords;
  final String? fillerWordsId;
  final String? fillerWordsTitle;
  final String? formalityScore;
  final String? formalityScoreId;
  final String? formalityScoreTitle;
  final String? grammarMistakes;
  final String? grammarMistakesId;
  final String? grammarMistakesTitle;
  final String? goalAlignment;

  Struggles({
    this.speakingRate,
    this.speakingRateId = '325c5505-fead-478d-b732-54f7a8685e9e',
    this.speakingRateTitle = 'WPM',
    this.vocalVariation,
    this.vocalVariationId = '72b207c7-e476-4fe0-a64e-c7c69aa685f3',
    this.vocalVariationTitle = 'Pitch Fluctuation',
    this.silentRatio,
    this.wordTheme,
    this.wordThemeId = 'd2be0b48-a567-42cb-b4d2-350543202209',
    this.wordThemeTitle = 'Common Words',
    this.fillerWords,
    this.fillerWordsId = '39337dce-6eb5-424b-a9d0-4020909a663b',
    this.fillerWordsTitle = 'Speech Fluency',
    this.formalityScore,
    this.formalityScoreId = '25a44f07-9330-44d1-847d-c9d35cb9b998',
    this.formalityScoreTitle = 'Formality',
    this.grammarMistakes,
    this.grammarMistakesId = '1ff8d974-46fd-4edc-84d2-f1cc85bd6948',
    this.grammarMistakesTitle = 'Grammar',
    this.goalAlignment,
  });

  Map<String, dynamic> toJson() => {
    'speakingRate': speakingRate,
    'speakingRateId': speakingRateId,
    'speakingRateTitle': speakingRateTitle,
    'vocalVariation': vocalVariation,
    'vocalVariationId': vocalVariationId,
    'vocalVariationTitle': vocalVariationTitle,
    'silentRatio': silentRatio,
    'wordTheme': wordTheme,
    'wordThemeId': wordThemeId,
    'wordThemeTitle': wordThemeTitle,
    'fillerWords': fillerWords,
    'fillerWordsId': fillerWordsId,
    'fillerWordsTitle': fillerWordsTitle,
    'formalityScore': formalityScore,
    'formalityScoreId': formalityScoreId,
    'formalityScoreTitle': formalityScoreTitle,
    'grammarMistakes': grammarMistakes,
    'grammarMistakesId': grammarMistakesId,
    'grammarMistakesTitle': grammarMistakesTitle,
    'goalAlignment': goalAlignment,
  };
}

class SpeechFeedback {
  final String part_1;
  final Struggles part_2;

  SpeechFeedback({
    required this.part_1,
    required this.part_2,
  });

  Map<String, dynamic> toJson() => {
    'part_1': part_1,
    'part_2': part_2.toJson(),
  };
}

class SpeechAnalysisFeedback {
  final int wordsPerMinute;
  final bool isMonotone;
  final double silentRatio;
  final List<String> mostCommonWords;
  final int fillerWords;
  final int formalityScore;
  final List<String> grammarMistakes;
  final String transcript;

  SpeechAnalysisFeedback({
    required this.wordsPerMinute,
    required this.isMonotone,
    required this.silentRatio,
    required this.mostCommonWords,
    required this.fillerWords,
    required this.formalityScore,
    required this.grammarMistakes,
    required this.transcript,
  });

  Map<String, dynamic> toJson() => {
    'wordsPerMinute': wordsPerMinute,
    'isMonotone': isMonotone,
    'silentRatio': silentRatio,
    'mostCommonWords': mostCommonWords,
    'fillerWords': fillerWords,
    'formalityScore': formalityScore,
    'grammarMistakes': grammarMistakes,
    'transcript': transcript,
  };
}

class GeminiClient {
  final String apiKey;
  final String baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  final int maxRetries = 3;
  final Duration retryDelay = Duration(seconds: 2);
  
  GeminiClient({required this.apiKey});

  Future<SpeechFeedback> generateSpeechFeedback(SpeechAnalysisFeedback analysis) async {
    int retryCount = 0;
    while (retryCount < maxRetries) {
      try {
        final response = await http.post(
          Uri.parse('$baseUrl?key=$apiKey'),
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonEncode({
            'contents': [
              {
                'parts': [
                  {'text': '''
Please analyze this speech transcript and provide feedback based on the following parameters:

1. Speaking Rate (${analysis.wordsPerMinute} WPM):
   - If < 120: "Speaking too slowly"
   - If > 150: "Speaking too fast"
   - If 120-150: null

2. Vocal Variation (${analysis.isMonotone ? 'monotone' : 'not monotone'}):
   - If monotone: "Lack of pitch variation and rhythm"
   - Otherwise: null

3. Silent Ratio (${analysis.silentRatio}):
   - If > 0.3: "Too much silence; possibly due to hesitation or low volume"
   - Otherwise: null

4. Word Theme Analysis:
   - Most common words: ${analysis.mostCommonWords.join(', ')}
   - Analyze the words to identify the dominant theme (e.g., casual conversation, technical terms, academic language)
   - If the theme is inappropriate or too narrow: "Limited vocabulary in [specific identified theme] terms"
   - Example: If most words are casual/filler words: "Limited vocabulary in formal communication terms"
   - Otherwise: null

5. Filler Words (${analysis.fillerWords} instances):
   - 1-5: "Minimal use of filler words"
   - 6-15: "Frequent use of filler words"
   - 16+: "Excessive use of filler words"

6. Formality Score (${analysis.formalityScore}%):
   - 60-79%: "Slightly too informal for the context"
   - 40-59%: "Noticeably too informal"
   - <40%: "Highly inappropriate formality level"
   - ≥80%: null

7. Grammar Mistakes:
   - Analyze these specific sentences for grammar issues:
   ${analysis.grammarMistakes.map((mistake) => "- $mistake").join('\n')}
   - Identify the types of grammar mistakes (e.g., subject-verb agreement, tense consistency, pronoun usage)
   - If mistakes found: "Grammar issues: [list of specific types of mistakes found]"
   - Example: "Grammar issues: Subject-verb agreement, past tense usage, pronoun case"
   - If no mistakes: null

8. Transcript Structure & Goal Alignment:
   - Evaluate structure, clarity, and goal alignment
   - If issues found: "Weaknesses in achieving the goal: [specific issues]"
   - Otherwise: null

Please provide feedback in two parts:

1. A comprehensive summary addressing each of the above points in sequence.

2. A JSON object with the following structure:
{
  "part1": "Your detailed natural language feedback here",
  "part2": [
    {"struggle": "value or null for speaking rate"},
    {"struggle": "value or null for vocal variation"},
    {"struggle": "value or null for silent ratio"},
    {"struggle": "value or null for word theme"},
    {"struggle": "value or null for filler words"},
    {"struggle": "value or null for formality score"},
    {"struggle": "value or null for grammar mistakes"},
    {"struggle": "value or null for goal alignment"}
  ]
}
'''}
                ]
              }
            ],
            'generationConfig': {
              'responseMimeType': 'application/json',
              'responseSchema': {
                'type': 'object',
                'properties': {
                  'part1': {'type': 'string'},
                  'part2': {
                    'type': 'array',
                    'items': {
                      'type': 'object',
                      'properties': {
                        'struggle': {'type': 'string'}
                      }
                    }
                  }
                }
              }
            }
          }),
        );

        if (response.statusCode == 200) {
          final data = jsonDecode(response.body);
          final feedbackText = data['candidates'][0]['content']['parts'][0]['text'];
          final feedbackJson = jsonDecode(feedbackText);
          
          final struggles = feedbackJson['part2'];
          
          return SpeechFeedback(
            part_1: feedbackJson['part1'],
            part_2: Struggles(
              speakingRate: struggles[0]['struggle'],
              vocalVariation: struggles[1]['struggle'],
              silentRatio: struggles[2]['struggle'],
              wordTheme: struggles[3]['struggle'],
              fillerWords: struggles[4]['struggle'],
              formalityScore: struggles[5]['struggle'],
              grammarMistakes: struggles[6]['struggle'],
              goalAlignment: struggles[7]['struggle'],
            ),
          );
        } else if (response.statusCode == 503) {
          print('Service temporarily unavailable. Retrying in ${retryDelay.inSeconds} seconds... (Attempt ${retryCount + 1}/$maxRetries)');
          retryCount++;
          await Future.delayed(retryDelay);
          continue;
        } else {
          print('Response body: ${response.body}');
          throw Exception('Failed to generate content: ${response.statusCode}');
        }
      } catch (e) {
        if (retryCount < maxRetries - 1) {
          print('Error occurred: $e');
          print('Retrying in ${retryDelay.inSeconds} seconds... (Attempt ${retryCount + 1}/$maxRetries)');
          retryCount++;
          await Future.delayed(retryDelay);
          continue;
        }
        rethrow;
      }
    }
    throw Exception('Failed to generate content after $maxRetries attempts');
  }
}

void main(List<String> arguments) async {
  final env = DotEnv(includePlatformEnvironment: true)..load();
  final apiKey = env['GEMINI_API_KEY'];
  
  if (apiKey == null) {
    print('Error: GEMINI_API_KEY not found in .env file');
    return;
  }

  final client = GeminiClient(apiKey: apiKey);
  
  // Example usage with more realistic test data
  final analysis = SpeechAnalysisFeedback(
    wordsPerMinute: 145,
    isMonotone: true,
    silentRatio: 0.08,
    mostCommonWords: ['innovation', 'technology', 'development'],
    fillerWords: 12,
    formalityScore: 85,
    grammarMistakes: ['I ate lot foods today', 'I going to school tomorrow'],
    transcript: '''
In today's rapidly evolving technological landscape, innovation plays a crucial role in driving development and progress. The integration of advanced technologies has transformed how we approach problem-solving and create solutions. However, this rapid pace of technological advancement also presents unique challenges that require careful consideration.

One of the most significant aspects of modern development is the emphasis on sustainable innovation. This approach ensures that technological progress aligns with environmental and social responsibilities. By focusing on sustainable practices, we can create solutions that benefit both current and future generations.

The relationship between technology and human interaction has become increasingly complex. While technological tools enhance our capabilities, they also raise important questions about privacy, security, and ethical considerations. These factors must be carefully balanced to ensure that innovation serves humanity's best interests.
''',
  );

  try {
    print('Generating speech analysis feedback...\n');
    final feedback = await client.generateSpeechFeedback(analysis);
    print('Speech Analysis Feedback:');
    print('------------------------');
    print('Part 1 - Natural Language Feedback:');
    print(feedback.part_1);
    print('\nPart 2 - Structured Analysis:');
    print('1. ${feedback.part_2.speakingRate} (${feedback.part_2.speakingRateId} - ${feedback.part_2.speakingRateTitle})');
    print('2. ${feedback.part_2.vocalVariation} (${feedback.part_2.vocalVariationId} - ${feedback.part_2.vocalVariationTitle})');
    print('3. ${feedback.part_2.silentRatio}');
    print('4. ${feedback.part_2.wordTheme} (${feedback.part_2.wordThemeId} - ${feedback.part_2.wordThemeTitle})');
    print('5. ${feedback.part_2.fillerWords} (${feedback.part_2.fillerWordsId} - ${feedback.part_2.fillerWordsTitle})');
    print('6. ${feedback.part_2.formalityScore} (${feedback.part_2.formalityScoreId} - ${feedback.part_2.formalityScoreTitle})');
    print('7. ${feedback.part_2.grammarMistakes} (${feedback.part_2.grammarMistakesId} - ${feedback.part_2.grammarMistakesTitle})');
    print('8. ${feedback.part_2.goalAlignment}');
  } catch (e) {
    print('Error: $e');
  }
} 