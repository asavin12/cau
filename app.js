// API keys (thay bằng khóa hợp lệ từ Google Cloud Console)
const API_KEYS = [
    "AIzaSyCdxcJf9F3myEQjI_1ogbS-6_0RLRtOEY8",
    "AIzaSyCp_VB-bpgQ6wEvVZBR04akkXcSVvwtoiQ",
    "AIzaSyAXlZH48sepbUXX5yV7IsnYmdMiwynWyBc",
    "AIzaSyCTRvEKv14mwiKzG6-6cZ_o0WI3BHBl3ZI",
    "AIzaSyDB7FnEBtoGs_BNoQx6gHOVJTwGBGgGOgA",
    "AIzaSyAm8YrImdMCWZrh8Pot2HDs35y1gV1wQAU",
    "AIzaSyCG4R2bDJmU3nE13ZWeuusLDCBxfBOjzFE",
    "AIzaSyAnG2PgKsyyeWZeH6fGti-UzNHx2_hKF2c"
];

let PRIMARY_KEY = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
let VERIFY_KEY = API_KEYS.find(key => key !== PRIMARY_KEY) || API_KEYS[0];

// Danh sách cấu trúc câu
const sentenceStructures = [
    {
        category: "Câu phụ (Nebensätze) với liên từ",
        structures: [
            { structure: "weil", translation: "bởi vì", example: "Ich bleibe zu Hause, weil ich krank bin." },
            { structure: "obwohl", translation: "mặc dù", example: "Obwohl es regnet, gehe ich spazieren." },
            { structure: "wenn", translation: "nếu/khi lặp lại", example: "Wenn ich Zeit habe, helfe ich dir." },
            { structure: "als", translation: "khi (quá khứ)", example: "Als ich klein war, spielte ich viel draußen." },
            { structure: "dass", translation: "rằng", example: "Ich glaube, dass er kommt." },
            { structure: "damit", translation: "để", example: "Ich lerne viel, damit ich die Prüfung bestehe." },
            { structure: "ob", translation: "liệu rằng", example: "Ich weiß nicht, ob er kommt." },
            { structure: "bevor", translation: "trước khi", example: "Bevor ich gehe, rufe ich dich an." },
            { structure: "nachdem", translation: "sau khi", example: "Nachdem ich gegessen habe, gehe ich spazieren." }
        ]
    },
    {
        category: "Câu bị động (Passiv)",
        structures: [
            { structure: "Präsens Passiv", translation: "bị động hiện tại", example: "Die E-Mails werden geschrieben." },
            { structure: "Präteritum Passiv", translation: "bị động quá khứ đơn", example: "Die Briefe wurden gestern verschickt." },
            { structure: "Perfekt Passiv", translation: "bị động hoàn thành", example: "Der Brief ist geschrieben worden." }
        ]
    },
    {
        category: "Cấu trúc với zu + Infinitiv",
        structures: [
            { structure: "Es ist wichtig, ... zu ...", translation: "Quan trọng là ...", example: "Es ist wichtig, Deutsch zu lernen." },
            { structure: "Ich habe Lust, ... zu ...", translation: "Tôi muốn ...", example: "Ich habe Lust, einen Film zu sehen." },
            { structure: "Ich habe keine Zeit, ... zu ...", translation: "Tôi không có thời gian để ...", example: "Ich habe keine Zeit, dir zu helfen." }
        ]
    },
    {
        category: "Câu điều kiện (Konjunktiv II)",
        structures: [
            { structure: "Wenn ich ... hätte/wäre, würde ...", translation: "Nếu tôi ... thì tôi sẽ ...", example: "Wenn ich mehr Geld hätte, würde ich reisen." },
            { structure: "würde + Infinitiv", translation: "Tôi muốn ...", example: "Ich würde gern mitkommen." }
        ]
    },
    {
        category: "Câu gián tiếp (Indirekte Rede – Konjunktiv I)",
        structures: [
            { structure: "Er sagt, ...", translation: "Anh ấy nói rằng ...", example: "Er sagt, er habe keine Zeit." },
            { structure: "Sie meint, ...", translation: "Cô ấy cho rằng ...", example: "Sie meint, sie sei krank." }
        ]
    },
    {
        category: "Câu mệnh lệnh (Imperativ)",
        structures: [
            { structure: "Du-Form", translation: "Câu lệnh ngôi thứ hai số ít", example: "Komm bitte pünktlich!" },
            { structure: "Ihr-Form", translation: "Câu lệnh ngôi thứ hai số nhiều", example: "Kommt schnell!" },
            { structure: "Sie-Form", translation: "Câu lệnh ngôi thứ ba số nhiều", example: "Kommen Sie bitte hierher!" }
        ]
    },
    {
        category: "Các cấu trúc khác",
        structures: [
            { structure: "Es gibt ...", translation: "Có ...", example: "Es gibt viele Möglichkeiten." },
            { structure: "Man sagt, dass ...", translation: "Người ta nói rằng ...", example: "Man sagt, dass er reich ist." },
            { structure: "Ich lasse ...", translation: "Tôi để ...", example: "Ich lasse mein Auto reparieren." },
            { structure: "Ich werde ...", translation: "Tôi sẽ ...", example: "Ich werde morgen arbeiten." }
        ]
    },
    {
        category: "Liên từ đi với Genitiv",
        structures: [
            { structure: "während", translation: "trong khi", example: "Während des Unterrichts darf man nicht sprechen." },
            { structure: "trotz", translation: "mặc dù", example: "Trotz des Regens gehen wir spazieren." },
            { structure: "wegen", translation: "vì", example: "Wegen des Unfalls komme ich zu spät." },
            { structure: "innerhalb", translation: "trong vòng", example: "Wir liefern das Paket innerhalb einer Woche." },
            { structure: "außerhalb", translation: "bên ngoài", example: "Außerhalb der Stadt ist es ruhiger." },
            { structure: "statt/anstatt", translation: "thay vì", example: "Statt eines Buches kaufte er einen Film." }
        ]
    },
    {
        category: "Liên từ đôi (Doppelkonjunktionen)",
        structures: [
            { structure: "sowohl ... als auch ...", translation: "cả ... và ...", example: "Sowohl du als auch ich haben das verstanden." },
            { structure: "entweder ... oder ...", translation: "hoặc ... hoặc ...", example: "Entweder gehst du oder ich." },
            { structure: "weder ... noch ...", translation: "không ... cũng không ...", example: "Weder er noch sie kann helfen." },
            { structure: "nicht nur ... sondern auch ...", translation: "không chỉ ... mà còn ...", example: "Er ist nicht nur klug, sondern auch fleißig." }
        ]
    }
];

// Danh sách chủ đề
const themes = [
    "Gia đình", "Công việc & Nghề nghiệp", "Du lịch & Nghỉ ngơi", "Giáo dục & Học tập",
    "Mua sắm & Tiêu dùng", "Sức khỏe & Cơ thể", "Giải trí & Sở thích", "Ăn uống",
    "Môi trường & Thiên nhiên", "Nhà cửa & Sinh sống", "Truyền thông & Công nghệ",
    "Cảm xúc & Cuộc sống hàng ngày", "Hành chính & Giấy tờ", "Giao thông & Di chuyển",
    "Các mối quan hệ & Xã hội"
];

// Biến trạng thái
let ruleStack = [];
let totalNewQuestions = 0;
let totalReviewQuestions = 0;
let totalQuestions = 0;
let totalCorrect = 0;
let totalWrong = 0;
let currentStructure = "";
let currentTranslation = "";
let currentCategory = "";
let currentExample = "";
let currentSentenceTranslation = "";
let currentExplanation = "";
let isStructureAnswered = false;
let reviewQuestions = JSON.parse(localStorage.getItem('wrongSentenceStructures') || '[]');
let lastWrongQuestion = null;
const MAX_API_RETRIES = 3;

// Hiển thị popup
function showPopup(title, message) {
    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupMessage').textContent = message;
    document.getElementById('popup').classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

// Ẩn popup
function hidePopup() {
    document.getElementById('popup').classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

// Hiển thị popup danh sách câu sai
function showWrongSentencesPopup() {
    const wrongSentencesList = document.getElementById('wrongSentencesList');
    if (reviewQuestions.length === 0) {
        wrongSentencesList.innerHTML = '<p class="text-center">Chưa có câu nào sai!</p>';
    } else {
        wrongSentencesList.innerHTML = '<ul>' + reviewQuestions.map((item, index) => `
            <li class="wrong-item">
                <p><strong>${index + 1}. Câu đúng:</strong> ${item.example} <button class="speak-wrong-btn" onclick="speakSentence('${item.example.replace(/'/g, "\\'")}')">Nghe</button></p>
                <p><strong>Câu bạn nhập:</strong> ${item.userAnswer}</p>
                <p><strong>Cấu trúc:</strong> ${item.structure}</p>
                <p><strong>Nghĩa cấu trúc:</strong> ${item.structureTranslation}</p>
                <p><strong>Loại cấu trúc:</strong> ${item.category}</p>
                <p><strong>Giải thích:</strong> ${item.explanation}</p>
            </li>
        `).join('') + '</ul>';
    }
    document.getElementById('wrongSentencesPopup').classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

// Ẩn popup danh sách câu sai
function hideWrongSentencesPopup() {
    document.getElementById('wrongSentencesPopup').classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

// Gọi API Gemini
async function callGeminiAPI(prompt, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return fixJson(data.candidates[0].content.parts[0].text);
    } catch (error) {
        throw error;
    }
}

// Thử với các khóa API khác nhau
async function tryWithDifferentKey(prompt, excludedKey) {
    const availableKeys = API_KEYS.filter(key => key !== excludedKey);
    for (const key of availableKeys) {
        try {
            const response = await callGeminiAPI(prompt, key);
            if (response) {
                PRIMARY_KEY = key;
                return response;
            }
        } catch (error) {
            if (error.message.includes('429')) {
                await new Promise(resolve => setTimeout(resolve, 500));
                continue;
            }
            console.warn(`Lỗi với key ${key.slice(0, 5)}...: ${error}`);
        }
    }
    throw new Error('Tất cả API key không hoạt động');
}

// Sửa JSON không hợp lệ
function fixJson(jsonStr) {
    jsonStr = jsonStr.replace(/```json\s*|\s*```/g, '').trim();
    const startIdx = jsonStr.indexOf('{');
    const endIdx = jsonStr.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        jsonStr = jsonStr.slice(startIdx, endIdx + 1);
    } else {
        return null;
    }

    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        jsonStr = jsonStr.replace(/,\s*}/g, '}').replace(/(\w+)(?=\s*:)/g, '"$1"');
        try {
            return JSON.parse(jsonStr);
        } catch {
            return null;
        }
    }
}

// Đánh giá câu người dùng qua API
async function evaluateSentenceWithAPI(correctSentence, userSentence, structure, sentenceTranslation) {
    const prompt = `
Kiểm tra bản dịch từ câu tiếng Việt '${sentenceTranslation}' sang câu tiếng Đức '${userSentence}'. 
Câu tiếng Việt '${sentenceTranslation}' được dịch từ câu tiếng Đức gốc '${correctSentence}', sử dụng cấu trúc '${structure}' để thể hiện ý nghĩa chính. 
Hãy đánh giá xem bản dịch tiếng Đức '${userSentence}' có khớp với câu gốc '${correctSentence}', sử dụng đúng cấu trúc '${structure}', và phù hợp với ngữ pháp, từ vựng, chính tả ở trình độ A1-B1 hay không.

Yêu cầu:
- Nếu bản dịch chính xác (khớp với '${correctSentence}', sử dụng đúng '${structure}', ngữ pháp, từ vựng, chính tả phù hợp A1-B1):
  - Trả về phản hồi: "Bản dịch chính xác phù hợp trình độ!"
  - Thêm giải thích ngắn gọn về cách sử dụng '${structure}' trong ngữ cảnh, kèm mẹo học (ví dụ: cách nhớ giống danh từ hoặc cấu trúc câu).
- Nếu bản dịch chưa chính xác (khác '${correctSentence}', sai '${structure}', ngữ pháp, từ vựng, hoặc chính tả):
  - Chỉ ra lỗi cụ thể:
    - Nếu sai '${structure}', nêu cấu trúc sai và cấu trúc đúng, giải thích cách dùng.
    - Nếu sai ngữ pháp, mô tả lỗi (ví dụ: sai thứ tự từ, chia động từ) kèm ví dụ minh họa.
    - Nếu sai chính tả, chỉ rõ lỗi và cách sửa.
    - Nếu từ vựng không phù hợp A1-B1, gợi ý từ đơn giản hơn.
    - Nếu bản dịch không khớp với '${correctSentence}', giải thích sự khác biệt và tại sao không đúng.
  - Cung cấp nghĩa của từ quan trọng trong câu tiếng Việt mà người dùng có thể chưa hiểu (ngoài '${structure}'), kèm giống danh từ (der/die/das).
  - Đưa ra câu tiếng Đức đúng (khớp với '${correctSentence}'), sử dụng '${structure}', phù hợp ngữ cảnh của câu tiếng Việt.
  - Thêm mẹo học tập: cách nhớ cấu trúc, giống, hoặc ngữ pháp liên quan.
  - Đề xuất một cấu trúc hoặc từ đồng nghĩa thay thế cho '${structure}' (nếu có) để mở rộng vốn từ.
- Phản hồi phải bằng tiếng Việt, ngắn gọn nhất có thể(tránh lan man), trình bày rõ ràng, dễ hiểu, khuyến khích người học.
- Nếu bản dịch không chứa '${structure}' hoặc câu không hợp lệ, nêu rõ lý do và cung cấp câu đúng.

Trả về dưới dạng JSON hợp lệ với hai khóa:
- check: boolean (true nếu đúng, false nếu sai)
- feedback: chuỗi (phản hồi chi tiết bằng tiếng Việt)

Định dạng JSON: Trả về một đối tượng JSON với khóa check và feedback. Ví dụ:
{
  "check": true,
  "feedback": "Bản dịch chính xác phù hợp trình độ! Cấu trúc 'weil' được dùng đúng để diễn tả lý do. Mẹo học: Ghi nhớ 'weil' luôn đẩy động từ xuống cuối câu phụ, ví dụ 'weil ich bin krank' là sai, phải là 'weil ich krank bin'."
}
hoặc
{
  "check": false,
  "feedback": "Chưa chính xác! Bản dịch không khớp với câu gốc '${correctSentence}'. Bạn dùng sai cấu trúc 'weil' thành 'warum'. 'Weil' diễn tả lý do, động từ phải ở cuối câu phụ. Lỗi ngữ pháp: Động từ 'bin' không ở cuối. Ví dụ: 'Ich bleibe, weil ich krank bin.' Từ quan trọng: 'die Zeit' (thời gian, danh từ giống die). Câu đúng: '${correctSentence}'. Mẹo học: Ghi nhớ 'weil' với cấu trúc '..., weil Subjekt + ... + Verb'. Cấu trúc thay thế: 'denn' (vì, không đẩy động từ xuống cuối)."
}
`;

    for (let retry = 0; retry < MAX_API_RETRIES; retry++) {
        try {
            const response = await tryWithDifferentKey(prompt, VERIFY_KEY);
            if (!response) continue;
            return response;
        } catch (error) {
            console.warn(`Lỗi API retry ${retry + 1}: ${error}`);
            if (retry === MAX_API_RETRIES - 1) {
                showPopup('Lỗi API', 'Không thể đánh giá câu. Vui lòng thử lại sau.');
                return {
                    check: false,
                    feedback: `Lỗi API: Không thể đánh giá câu. Câu đúng: ${correctSentence}`
                };
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}

// Tạo stack quy tắc
function createRuleStack() {
    const stack = [];
    totalNewQuestions = 0;

    sentenceStructures.forEach(category => {
        category.structures.forEach((structure, idx) => {
            stack.push(`${category.category}_${idx}`);
            totalNewQuestions++;
        });
    });

    // Xáo trộn stack
    for (let i = stack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [stack[i], stack[j]] = [stack[j], stack[i]];
    }

    console.log('ruleStack created:', stack);
    return stack;
}

// Tạo câu ví dụ từ cấu trúc
async function getSentenceFromStructure(structure, category) {
    console.log('getSentenceFromStructure called, structure:', structure, 'category:', category);
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    const prompt = `
Tạo một câu ví dụ đơn giản ở trình độ A1-B1 tiếng Đức sử dụng cấu trúc '${structure}', thuộc loại cấu trúc ngữ pháp '${category}' và chủ đề '${randomTheme}'.
Câu phải:
- Dễ hiểu, phù hợp với người học tiếng Đức cơ bản.
- Phản ánh ngữ cảnh đời thường ở Đức.
- Sử dụng đúng cấu trúc '${structure}' trong ngữ cảnh của '${category}' (ví dụ: nếu '${category}' là "Câu phụ (Nebensätze) với liên từ", câu phải là câu phụ với liên từ như '${structure}').
- Sử dụng ngữ cảnh ngẫu nhiên khác nhau mỗi lần (seed: ${Math.random()}).
Cung cấp giải thích chi tiết bằng tiếng Việt, bao gồm:
- Ngữ cảnh sử dụng của câu ví dụ (câu này thường được dùng trong tình huống nào).
- Tại sao cấu trúc '${structure}' được dùng trong trường hợp này, đặc biệt liên quan đến loại cấu trúc '${category}' (liên quan đến ngữ nghĩa và ngữ pháp).
- Mẹo ghi nhớ: đưa ra một cụm từ ví dụ minh họa để người học dễ nhớ cách dùng '${structure}' trong '${category}'.
Giải thích phải rõ ràng, dễ hiểu, và thân thiện với người học tiếng Đức ở trình độ cơ bản.
Trả về JSON:
{
  "example": "câu tiếng Đức hoàn chỉnh",
  "translation": "dịch nghĩa sang tiếng Việt",
  "explanation": "giải thích chi tiết bằng tiếng Việt (bao gồm ngữ cảnh, lý do, và mẹo ghi nhớ)"
}
`;

    for (let retry = 0; retry < MAX_API_RETRIES; retry++) {
        try {
            const response = await tryWithDifferentKey(prompt, VERIFY_KEY);
            if (!response) continue;

            console.log('getSentenceFromStructure response:', response);
            return [
                response.example,
                response.translation,
                response.explanation
            ];
        } catch (error) {
            console.warn(`Lỗi API retry ${retry + 1}: ${error}`);
            if (retry === MAX_API_RETRIES - 1) {
                showPopup('Lỗi API', 'Không thể lấy câu mới. Vui lòng kiểm tra kết nối hoặc thử lại sau.');
                return [
                    `Không có câu - lỗi API`,
                    "Không có dịch nghĩa (lỗi API)",
                    "Không có giải thích (lỗi API)"
                ];
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}

// Phát âm câu ví dụ
function speakSentence(sentence) {
    if (!('speechSynthesis' in window)) {
        showPopup('Lỗi phát âm', 'Trình duyệt không hỗ trợ Web Speech API. Vui lòng sử dụng trình duyệt hiện đại như Chrome, Edge, hoặc Safari mới nhất.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = 'de-DE';
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(voice => voice.lang === 'de-DE' || voice.lang.startsWith('de'));

    if (germanVoice) {
        utterance.voice = germanVoice;
    } else {
        showPopup('Cảnh báo phát âm', 'Không tìm thấy giọng tiếng Đức trên thiết bị. Vui lòng cài đặt giọng tiếng Đức hoặc thử trình duyệt khác (Chrome/Edge).');
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    utterance.onerror = (event) => {
        showPopup('Lỗi phát âm', `Không thể phát âm "${sentence}": ${event.error}. Vui lòng kiểm tra cài đặt âm thanh hoặc thử lại.`);
    };
}

// Đảm bảo danh sách giọng nói được tải trước
function loadVoices() {
    return new Promise((resolve) => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            resolve();
        } else {
            window.speechSynthesis.onvoiceschanged = () => {
                setTimeout(() => resolve(), 100);
            };
        }
    });
}

// Lưu câu trả lời sai
function saveWrongAnswer(structure, structureTranslation, category, userAnswer, example, sentenceTranslation, explanation) {
    reviewQuestions.push({ structure, structureTranslation, category, userAnswer, example, sentenceTranslation, explanation });
    localStorage.setItem('wrongSentenceStructures', JSON.stringify(reviewQuestions.slice(-100)));
}

// Xóa câu trả lời đúng
function removeCorrectAnswer(structure) {
    reviewQuestions = reviewQuestions.filter(q => q.structure !== structure);
    localStorage.setItem('wrongSentenceStructures', JSON.stringify(reviewQuestions));
}

// Cập nhật thống kê
function updateStats() {
    totalQuestions = totalCorrect + totalWrong;
    document.getElementById('stats').textContent = `Tổng số câu hỏi: ${totalQuestions} | Đúng: ${totalCorrect} | Sai: ${totalWrong}`;
}

// Chuyển sang câu tiếp theo
async function nextQuestion() {
    console.log('nextQuestion called, isStructureAnswered:', isStructureAnswered, 'ruleStack length:', ruleStack.length, 'reviewQuestions length:', reviewQuestions.length);

    // Đặt lại trạng thái
    isStructureAnswered = false;

    if (ruleStack.length > 0) {
        // Lấy cấu trúc mới
        const ruleId = ruleStack.shift();
        const parts = ruleId.split('_');
        const category = parts[0];
        const idx = parseInt(parts[1]);
        const structureData = sentenceStructures.find(cat => cat.category === category).structures[idx];
        currentStructure = structureData.structure;
        currentTranslation = structureData.translation;
        currentCategory = category;

        // Tạo câu ví dụ
        try {
            [currentExample, currentSentenceTranslation, currentExplanation] = await getSentenceFromStructure(currentStructure, currentCategory);
        } catch (error) {
            console.error('Lỗi trong getSentenceFromStructure:', error);
            showPopup('Lỗi', 'Không thể lấy câu mới. Vui lòng thử lại.');
            return;
        }

        // Hiển thị câu
        document.getElementById('sentence').textContent = currentSentenceTranslation;
        document.getElementById('input-label').textContent = 'Nhập câu tiếng Đức:';
        document.getElementById('answer').placeholder = 'Câu tiếng Đức';
        document.getElementById('feedback').textContent = '';
        document.getElementById('feedback').classList.remove('correct', 'wrong');
        document.getElementById('answer').value = '';
        document.getElementById('answer').disabled = false;
        document.getElementById('speakBtn').disabled = false;
        document.getElementById('answer').focus();

        // Hiển thị gợi ý (chỉ category và translation)
        document.getElementById('structure-category').textContent = currentCategory;
        document.getElementById('structure-translation').textContent = currentTranslation;

        console.log('nextQuestion: Showing sentence, translation:', currentSentenceTranslation, 'structure:', currentStructure, 'category:', currentCategory);
    } else if (reviewQuestions.length > 0) {
        // Ôn tập câu sai
        const availableQuestions = reviewQuestions.filter(q => 
            !lastWrongQuestion || q.structure !== lastWrongQuestion.structure
        );
        let question;
        if (availableQuestions.length === 0) {
            question = reviewQuestions[Math.floor(Math.random() * reviewQuestions.length)];
        } else {
            question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        }
        currentStructure = question.structure;
        currentTranslation = question.structureTranslation;
        currentCategory = question.category;
        currentExample = question.example;
        currentSentenceTranslation = question.sentenceTranslation;
        currentExplanation = question.explanation;

        document.getElementById('sentence').textContent = currentSentenceTranslation;
        document.getElementById('input-label').textContent = 'Nhập câu tiếng Đức:';
        document.getElementById('answer').placeholder = 'Câu tiếng Đức';
        document.getElementById('feedback').textContent = '';
        document.getElementById('feedback').classList.remove('correct', 'wrong');
        document.getElementById('answer').value = '';
        document.getElementById('answer').disabled = false;
        document.getElementById('speakBtn').disabled = false;
        reviewQuestions = reviewQuestions.filter(q => q.structure !== currentStructure);
        localStorage.setItem('wrongSentenceStructures', JSON.stringify(reviewQuestions));
        document.getElementById('answer').focus();

        // Hiển thị gợi ý (chỉ category và translation)
        document.getElementById('structure-category').textContent = currentCategory;
        document.getElementById('structure-translation').textContent = currentTranslation;

        console.log('nextQuestion: Reviewing wrong question, structure:', currentStructure, 'category:', currentCategory);
    } else {
        showPopup('Hoàn thành', `Bạn đã hoàn thành!\nTổng số câu hỏi: ${totalQuestions}\nĐúng: ${totalCorrect}\nSai: ${totalWrong}`);
        document.getElementById('answer').disabled = true;
        document.getElementById('nextBtn').disabled = true;
        document.getElementById('speakBtn').disabled = true;
        document.getElementById('viewWrongBtn').disabled = true;
        document.getElementById('clearWrongBtn').disabled = true;
        return;
    }
}

// Kiểm tra câu trả lời
async function checkAnswer() {
    console.log('checkAnswer called, isStructureAnswered:', isStructureAnswered);
    const userAnswer = document.getElementById('answer').value.trim();
    if (!userAnswer) {
        showPopup('Cảnh báo', 'Vui lòng nhập câu tiếng Đức!');
        return;
    }

    // Kiểm tra câu qua API
    const evaluation = await evaluateSentenceWithAPI(currentExample, userAnswer, currentStructure, currentSentenceTranslation);
    const isCorrect = evaluation.check;
    let feedbackText = evaluation.feedback;
    feedbackText += `\n\nLoại cấu trúc: ${currentCategory}\nGiải thích: ${currentExplanation}`;

    if (isCorrect) {
        totalCorrect++;
        document.getElementById('feedback').textContent = `Đúng! 🎉\n${feedbackText}`;
        document.getElementById('feedback').classList.add('correct');
        removeCorrectAnswer(currentStructure);
        lastWrongQuestion = null;
    } else {
        totalWrong++;
        document.getElementById('feedback').textContent = `Sai! 😔\n${feedbackText}`;
        document.getElementById('feedback').classList.add('wrong');
        lastWrongQuestion = { structure: currentStructure };
        saveWrongAnswer(currentStructure, currentTranslation, currentCategory, userAnswer, currentExample, currentSentenceTranslation, currentExplanation);
    }

    updateStats();
    isStructureAnswered = true;
    speakSentence(currentExample);
    document.getElementById('answer').focus();
    console.log('checkAnswer: Sentence check, isCorrect:', isCorrect);
}

// Sự kiện
document.getElementById('nextBtn').addEventListener('click', () => {
    console.log('nextBtn clicked, isStructureAnswered:', isStructureAnswered);
    if (isStructureAnswered) {
        nextQuestion();
    } else {
        showPopup('Cảnh báo', 'Vui lòng trả lời câu trước khi chuyển câu!');
    }
});

document.getElementById('popup').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        console.log('Clicked outside popup, closing');
        hidePopup();
    }
});

document.getElementById('wrongSentencesPopup').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        console.log('Clicked outside wrongSentencesPopup, closing');
        hideWrongSentencesPopup();
    }
});

document.getElementById('speakBtn').addEventListener('click', () => {
    console.log('speakBtn clicked');
    speakSentence(currentExample);
});

document.getElementById('viewWrongBtn').addEventListener('click', () => {
    console.log('viewWrongBtn clicked, reviewQuestions length:', reviewQuestions.length);
    showWrongSentencesPopup();
});

document.getElementById('clearWrongBtn').addEventListener('click', () => {
    console.log('clearWrongBtn clicked');
    reviewQuestions = [];
    localStorage.setItem('wrongSentenceStructures', '[]');
    showPopup('Thông báo', 'Đã xóa lịch sử câu sai!');
});

document.getElementById('popupClose').addEventListener('click', hidePopup);
document.getElementById('wrongSentencesPopupClose').addEventListener('click', hideWrongSentencesPopup);

document.getElementById('answer').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        console.log('Enter pressed, isStructureAnswered:', isStructureAnswered);
        if (!isStructureAnswered) {
            checkAnswer();
        } else {
            nextQuestion();
        }
    }
});

// Khởi tạo
async function init() {
    console.log('init started');
    await loadVoices();
    ruleStack = createRuleStack();
    totalReviewQuestions = reviewQuestions.length;
    totalQuestions = totalNewQuestions + totalReviewQuestions;
    updateStats();

    // Kiểm tra nếu có câu hỏi mới hoặc câu sai để hiển thị
    if (ruleStack.length > 0) {
        // Lấy cấu trúc đầu tiên từ ruleStack để hiển thị gợi ý
        const ruleId = ruleStack[0]; // Lấy nhưng không xóa
        const parts = ruleId.split('_');
        const category = parts[0];
        const idx = parseInt(parts[1]);
        const structureData = sentenceStructures.find(cat => cat.category === category).structures[idx];
        currentStructure = structureData.structure;
        currentTranslation = structureData.translation;
        currentCategory = category;

        // Hiển thị gợi ý ngay lập tức
        document.getElementById('structure-category').textContent = currentCategory;
        document.getElementById('structure-translation').textContent = currentTranslation;

        // Gọi nextQuestion để tải câu đầu tiên
        await nextQuestion();
    } else if (reviewQuestions.length > 0) {
        // Nếu không có câu mới, lấy câu sai đầu tiên để hiển thị gợi ý
        const question = reviewQuestions[0];
        currentStructure = question.structure;
        currentTranslation = question.structureTranslation;
        currentCategory = question.category;

        // Hiển thị gợi ý ngay lập tức
        document.getElementById('structure-category').textContent = currentCategory;
        document.getElementById('structure-translation').textContent = currentTranslation;

        // Gọi nextQuestion để tải câu sai
        await nextQuestion();
    } else {
        // Không có câu hỏi, hiển thị thông báo hoàn thành
        showPopup('Hoàn thành', 'Không còn câu hỏi nào để luyện tập!');
        document.getElementById('answer').disabled = true;
        document.getElementById('nextBtn').disabled = true;
        document.getElementById('speakBtn').disabled = true;
        document.getElementById('viewWrongBtn').disabled = true;
        document.getElementById('clearWrongBtn').disabled = true;
    }

    console.log('init completed');
}

init();