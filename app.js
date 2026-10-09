const gradeSelect = document.querySelector("#grade-select");
const subjectSelect = document.querySelector("#subject-select");
const subjectGrid = document.querySelector("#subject-grid");
const quizDialog = document.querySelector("#quiz-dialog");
const quizTitle = document.querySelector("#quiz-title");
const quizOptions = document.querySelector("#quiz-options");
const quizCount = document.querySelector("#quiz-count");
const quizSubject = document.querySelector("#quiz-subject");
const quizFeedback = document.querySelector("#quiz-feedback");
const quizNext = document.querySelector("#quiz-next");
const quizProgressFill = document.querySelector("#quiz-progress-fill");

const subjectsByStage = {
  elementary: [
    { id: "math", name: "算数", description: "計算や図形にチャレンジ", icon: "🔢", color: "math" },
    { id: "japanese", name: "国語", description: "ことばと文章を学ぼう", icon: "📖", color: "japanese" },
    { id: "science", name: "理科", description: "ふしぎを見つけよう", icon: "🔬", color: "science" },
    { id: "social", name: "社会", description: "くらしや地図を知ろう", icon: "🗺️", color: "social" },
  ],
  middle: [
    { id: "math", name: "数学", description: "考える力をのばそう", icon: "📐", color: "math" },
    { id: "japanese", name: "国語", description: "読解とことばを学ぼう", icon: "📖", color: "japanese" },
    { id: "english", name: "英語", description: "単語と表現を身につけよう", icon: "🔤", color: "english" },
    { id: "science", name: "理科", description: "自然のしくみを学ぼう", icon: "🔬", color: "science" },
    { id: "social", name: "社会", description: "歴史や地理を学ぼう", icon: "🗺️", color: "social" },
  ],
  high: [
    { id: "math", name: "数学", description: "数学の考え方を深めよう", icon: "📐", color: "math" },
    { id: "english", name: "英語", description: "語彙と文法を身につけよう", icon: "🔤", color: "english" },
    { id: "physics", name: "物理", description: "公式の使い方を練習しよう", icon: "⚛️", color: "physics" },
    { id: "japanese", name: "国語", description: "文章の読解にチャレンジ", icon: "📖", color: "japanese" },
    { id: "science", name: "化学", description: "化学の基本を確認しよう", icon: "🧪", color: "science" },
  ],
};

const questions = {
  elementary: {
    math: [
      { prompt: "36 ÷ 4 はいくつ？", options: ["8", "9", "10", "12"], answer: 1, explanation: "4 × 9 = 36 だから、36 ÷ 4 = 9 だね。" },
      { prompt: "1辺が5cmの正方形のまわりの長さは？", options: ["10cm", "15cm", "20cm", "25cm"], answer: 2, explanation: "正方形は4辺が同じ長さ。5 × 4 = 20cmだよ。" },
      { prompt: "0.7 + 0.8 はいくつ？", options: ["1.3", "1.4", "1.5", "1.6"], answer: 2, explanation: "小数点の位置をそろえて計算すると、0.7 + 0.8 = 1.5。" },
    ],
    japanese: [
      { prompt: "「美しい」の反対の意味に近い言葉はどれ？", options: ["きれい", "うつくしい", "みにくい", "あざやか"], answer: 2, explanation: "「みにくい」は「美しい」と反対の意味を表す言葉だよ。" },
      { prompt: "「鳥が空を飛ぶ。」の主語はどれ？", options: ["鳥が", "空を", "飛ぶ", "空"], answer: 0, explanation: "「だれが・何が」にあたる「鳥が」が主語だね。" },
      { prompt: "「走る」をていねいな言い方にすると？", options: ["走った", "走ります", "走ろう", "走れば"], answer: 1, explanation: "「走ります」は「走る」をていねいにした言い方だよ。" },
    ],
    science: [
      { prompt: "植物が日光を受けて、葉で養分をつくるはたらきは？", options: ["呼吸", "発芽", "光合成", "蒸発"], answer: 2, explanation: "植物は日光を使って、葉で養分をつくる。これを光合成というよ。" },
      { prompt: "水がこおり始める温度は何度？", options: ["0℃", "10℃", "50℃", "100℃"], answer: 0, explanation: "水はふつう、0℃でこおり始めるよ。" },
      { prompt: "磁石に引きつけられるものはどれ？", options: ["木のつくえ", "鉄のくぎ", "紙のノート", "ガラスのコップ"], answer: 1, explanation: "鉄は磁石に引きつけられる金属だよ。" },
    ],
    social: [
      { prompt: "日本の都道府県の数はいくつ？", options: ["43", "45", "47", "50"], answer: 2, explanation: "日本には1都1道2府43県、合わせて47の都道府県があるよ。" },
      { prompt: "地図で、ふつう上の方が表す方角は？", options: ["東", "西", "南", "北"], answer: 3, explanation: "地図は上が北、下が南を表すことが多いよ。" },
      { prompt: "日本でいちばん高い山はどれ？", options: ["北岳", "富士山", "奥穂高岳", "槍ヶ岳"], answer: 1, explanation: "富士山は標高3,776mで、日本でいちばん高い山だよ。" },
    ],
  },
  middle: {
    math: [
      { prompt: "方程式 3x + 5 = 20 の x はいくつ？", options: ["3", "5", "8", "15"], answer: 1, explanation: "両辺から5を引いて3x=15。両辺を3で割るとx=5だよ。" },
      { prompt: "半径3cmの円の面積は？（円周率はπ）", options: ["3π cm²", "6π cm²", "9π cm²", "12π cm²"], answer: 2, explanation: "円の面積は半径×半径×π。3×3×π=9π cm²だよ。" },
      { prompt: "サイコロを1回振るとき、偶数が出る確率は？", options: ["1/6", "1/3", "1/2", "2/3"], answer: 2, explanation: "偶数は2・4・6の3つ。全部で6通りだから3/6=1/2だよ。" },
    ],
    japanese: [
      { prompt: "「しかし」は、文と文をどのようにつなぐ接続語？", options: ["理由", "逆接", "例示", "追加"], answer: 1, explanation: "「しかし」は、前の内容と反対の内容をつなぐ逆接の接続語だよ。" },
      { prompt: "「古典」の読み方はどれ？", options: ["こてん", "ふるてん", "こでん", "ふるのり"], answer: 0, explanation: "「古典」は「こてん」と読むよ。" },
      { prompt: "「彼はまるで太陽のように明るい」は何の表現？", options: ["擬人法", "比喩（直喩）", "倒置法", "反復法"], answer: 1, explanation: "「まるで〜のように」とたとえているので、直喩だね。" },
    ],
    english: [
      { prompt: "「私は毎日テニスをします」を表す英文は？", options: ["I play tennis every day.", "I plays tennis every day.", "I am play tennis every day.", "I playing tennis every day."], answer: 0, explanation: "主語がIの現在形では動詞はplay。every dayは「毎日」だよ。" },
      { prompt: "「図書館」を意味する英単語はどれ？", options: ["museum", "library", "station", "kitchen"], answer: 1, explanation: "libraryは「図書館」という意味だよ。" },
      { prompt: "They (　) watching a movie now. に入る語は？", options: ["is", "am", "are", "be"], answer: 2, explanation: "主語がTheyなので、be動詞はare。現在進行形はare watchingだよ。" },
    ],
    science: [
      { prompt: "電流の単位はどれ？", options: ["ボルト（V）", "アンペア（A）", "オーム（Ω）", "ワット（W）"], answer: 1, explanation: "電流の単位はアンペア（A）。電圧はボルト、抵抗はオームだよ。" },
      { prompt: "酸性の水溶液に青色リトマス紙をつけると？", options: ["赤色になる", "青色のまま", "白色になる", "緑色になる"], answer: 0, explanation: "酸性の水溶液に青色リトマス紙をつけると赤色に変わるよ。" },
      { prompt: "地球が太陽のまわりを1周するのにかかる時間は？", options: ["約1日", "約1か月", "約1年", "約10年"], answer: 2, explanation: "地球は約1年かけて太陽のまわりを1周するよ。" },
    ],
    social: [
      { prompt: "日本国憲法が施行された年は？", options: ["1889年", "1945年", "1947年", "1952年"], answer: 2, explanation: "日本国憲法は1946年に公布され、1947年5月3日に施行されたよ。" },
      { prompt: "赤道に近い地域に広がる気候帯は？", options: ["寒帯", "温帯", "乾燥帯", "熱帯"], answer: 3, explanation: "赤道付近は一年を通して気温が高く、熱帯に分類されるよ。" },
      { prompt: "日本の国会をつくる2つの議院は？", options: ["上院と下院", "衆議院と参議院", "国民院と政府院", "県議会と市議会"], answer: 1, explanation: "日本の国会は、衆議院と参議院の二院制だよ。" },
    ],
  },
  high: {
    math: [
      { prompt: "関数 y = 2x² を x で微分すると？", options: ["2x", "4x", "x²", "4x²"], answer: 1, explanation: "べき乗の微分より、(2x²)' = 2 × 2x = 4xだよ。" },
      { prompt: "log₂ 8 の値は？", options: ["2", "3", "4", "8"], answer: 1, explanation: "2³=8なので、log₂ 8=3だよ。" },
      { prompt: "初項2、公差3の等差数列の第5項は？", options: ["11", "12", "14", "17"], answer: 2, explanation: "第5項は2 + (5−1)×3 = 14だよ。" },
    ],
    english: [
      { prompt: "空欄に入る語は？ I have lived here (　) 2020.", options: ["for", "since", "during", "by"], answer: 1, explanation: "sinceは「〜以来」。2020のような始まった時点と使うよ。" },
      { prompt: "「環境」を意味する英単語はどれ？", options: ["environment", "government", "development", "movement"], answer: 0, explanation: "environmentは「環境」という意味だよ。" },
      { prompt: "The book (　) by many students. に入る語は？", options: ["read", "reads", "is read", "is reading"], answer: 2, explanation: "「本が読まれる」という受け身の文なので、is readが入るよ。" },
    ],
    physics: [
      { prompt: "質量2kgの物体に、加速度3m/s²を生じさせる力は？", options: ["1.5N", "5N", "6N", "9N"], answer: 2, explanation: "運動方程式 F=ma より、2×3=6Nだよ。" },
      { prompt: "電圧12V、抵抗4Ωの回路に流れる電流は？", options: ["0.3A", "3A", "8A", "48A"], answer: 1, explanation: "オームの法則 I=V/R より、12÷4=3Aだよ。" },
      { prompt: "波の速さを表す式はどれ？（振動数f、波長λ）", options: ["v = fλ", "v = f/λ", "v = λ/f", "v = f + λ"], answer: 0, explanation: "波の速さは、振動数×波長で v=fλ と表せるよ。" },
    ],
    japanese: [
      { prompt: "「杞憂」の意味として正しいものは？", options: ["思いがけない幸運", "必要のない心配", "強い決意", "昔の思い出"], answer: 1, explanation: "杞憂は、心配する必要のないことをあれこれ心配することだよ。" },
      { prompt: "「山のように積まれた本」は何の表現？", options: ["直喩", "隠喩", "擬人法", "倒置法"], answer: 0, explanation: "「山のように」と「ように」を使ってたとえる直喩だよ。" },
      { prompt: "文章の中で、筆者の主張を支える具体例の役割は？", options: ["主張を分かりやすくする", "題名を説明する", "段落数を増やす", "結論を隠す"], answer: 0, explanation: "具体例は、主張の内容を読者に分かりやすく伝える助けになるよ。" },
    ],
    science: [
      { prompt: "水の化学式はどれ？", options: ["CO₂", "O₂", "H₂O", "NaCl"], answer: 2, explanation: "水は水素原子2つと酸素原子1つからできていて、化学式はH₂Oだよ。" },
      { prompt: "原子核を構成する粒子の組み合わせは？", options: ["陽子と中性子", "陽子と電子", "電子と中性子", "電子だけ"], answer: 0, explanation: "原子核は、正の電荷をもつ陽子と電荷をもたない中性子からできているよ。" },
      { prompt: "酸と塩基が反応して水と塩ができる反応は？", options: ["酸化", "中和", "分解", "重合"], answer: 1, explanation: "酸と塩基が反応して互いの性質を打ち消し、水と塩を生じる反応を中和というよ。" },
    ],
  },
};

const stageForGrade = (grade) => grade.startsWith("小") ? "elementary" : grade.startsWith("中") ? "middle" : "high";
const gradeLongName = (grade) => {
  const school = grade.slice(0, 1);
  const year = grade.slice(1);
  return `${school === "小" ? "小学" : school === "中" ? "中学" : "高校"}${year}年生`;
};
const today = new Date();
document.querySelector("#today-date").textContent = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric", month: "long", day: "numeric", weekday: "long",
}).format(today);

let stats = loadStats();
let activeQuestions = [];
let questionIndex = 0;
let correctAnswers = 0;
let answered = false;
let activeSubject = null;
let activeHistoryEntry = null;

function showStorageNotice(message) {
  const notice = document.querySelector("#storage-notice");
  notice.textContent = message;
  notice.hidden = false;
}

function loadStats() {
  try {
    const saved = JSON.parse(localStorage.getItem("manabi-pocket-stats") || "{}");
    return {
      sessions: Number.isSafeInteger(saved.sessions) && saved.sessions >= 0 ? saved.sessions : 0,
      correct: Number.isSafeInteger(saved.correct) && saved.correct >= 0 ? saved.correct : 0,
      studyDates: Array.isArray(saved.studyDates)
        ? [...new Set(saved.studyDates.filter((date) => typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)))]
        : [],
      history: Array.isArray(saved.history) ? saved.history.filter((entry) =>
        entry && typeof entry.completedAt === "string" &&
        Number.isFinite(Date.parse(entry.completedAt)) &&
        typeof entry.grade === "string" && typeof entry.subject === "string" &&
        typeof entry.icon === "string" && typeof entry.color === "string" &&
        Number.isSafeInteger(entry.correct) && entry.correct >= 0 &&
        Number.isSafeInteger(entry.total) && entry.total > 0 && entry.correct <= entry.total
      ).map((entry) => ({
        ...entry,
        answered: Number.isSafeInteger(entry.answered) && entry.answered >= 0 && entry.answered <= entry.total
          ? entry.answered
          : entry.total,
      })).slice(0, 50) : [],
    };
  } catch {
    showStorageNotice("学習記録を読み込めませんでした。新しい記録から始めます。");
    return { sessions: 0, correct: 0, studyDates: [], history: [] };
  }
}

function saveStats() {
  try {
    localStorage.setItem("manabi-pocket-stats", JSON.stringify(stats));
  } catch {
    showStorageNotice("このブラウザに学習記録を保存できませんでした。ブラウザの設定をご確認ください。");
  }
}

function updateStats() {
  document.querySelector("#days-stat").innerHTML = `${stats.studyDates.length}<span>日</span>`;
  document.querySelector("#sessions-stat").innerHTML = `${stats.sessions}<span>回</span>`;
  document.querySelector("#correct-stat").innerHTML = `${stats.correct}<span>問</span>`;
  document.querySelector("#history-days-stat").innerHTML = `${stats.studyDates.length}<span>日</span>`;
  document.querySelector("#history-sessions-stat").innerHTML = `${stats.sessions}<span>回</span>`;
  document.querySelector("#history-correct-stat").innerHTML = `${stats.correct}<span>問</span>`;
}

function renderHistory() {
  const historyList = document.querySelector("#history-list");
  if (stats.history.length === 0) {
    const empty = document.createElement("div");
    empty.className = "history-empty";
    const icon = document.createElement("div");
    icon.className = "history-empty-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "📝";
    const message = document.createElement("p");
    message.textContent = "まだチャレンジのきろくはありません。問題に挑戦してみよう！";
    const link = document.createElement("a");
    link.className = "history-start-link";
    link.href = "#subjects";
    link.dataset.view = "subjects";
    link.textContent = "教科をえらぶ →";
    empty.append(icon, message, link);
    historyList.replaceChildren(empty);
    return;
  }

  historyList.replaceChildren(...stats.history.map((entry) => {
    const item = document.createElement("article");
    item.className = "history-item";
    const main = document.createElement("div");
    main.className = "history-item-main";
    const icon = document.createElement("span");
    icon.className = `history-item-icon ${entry.color}`;
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = entry.icon;
    const details = document.createElement("div");
    const subject = document.createElement("strong");
    subject.textContent = `${entry.grade} · ${entry.subject}`;
    const caption = document.createElement("span");
    caption.textContent = entry.answered < entry.total
      ? `${entry.answered} / ${entry.total}問に回答 · 進行中`
      : `${entry.total}問チャレンジ`;
    details.append(subject, caption);
    main.append(icon, details);
    const date = document.createElement("time");
    date.className = "history-item-date";
    date.dateTime = entry.completedAt;
    date.textContent = new Intl.DateTimeFormat("ja-JP", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    }).format(new Date(entry.completedAt));
    const score = document.createElement("span");
    score.className = "history-score";
    score.textContent = entry.answered < entry.total
      ? `${entry.correct}問正解`
      : `${entry.correct} / ${entry.total}問 正解`;
    item.append(main, date, score);
    return item;
  }));
}

function renderSubjects() {
  const stage = stageForGrade(gradeSelect.value);
  const subjects = subjectsByStage[stage];
  const previous = subjectSelect.value;
  subjectSelect.replaceChildren(...subjects.map((subject) => {
    const option = document.createElement("option");
    option.value = subject.id;
    option.textContent = subject.name;
    return option;
  }));
  subjectSelect.value = subjects.some((subject) => subject.id === previous) ? previous : subjects[0].id;
  subjectGrid.replaceChildren(...subjects.map((subject) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `subject-card ${subject.color}${subject.id === subjectSelect.value ? " selected" : ""}`;
    card.dataset.subject = subject.id;
    card.setAttribute("aria-pressed", String(subject.id === subjectSelect.value));

    const tag = document.createElement("span");
    tag.className = "subject-tag";
    tag.textContent = "3問";
    const text = document.createElement("span");
    const title = document.createElement("h3");
    title.textContent = subject.name;
    const description = document.createElement("p");
    description.textContent = subject.description;
    text.append(title, description);
    const icon = document.createElement("span");
    icon.className = "subject-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = subject.icon;
    card.append(tag, text, icon);
    card.addEventListener("click", () => {
      subjectSelect.value = subject.id;
      syncSubjectCards();
      startQuiz();
    });
    return card;
  }));
}

function syncSubjectCards() {
  subjectGrid.querySelectorAll(".subject-card").forEach((card) => {
    const selected = card.dataset.subject === subjectSelect.value;
    card.classList.toggle("selected", selected);
    card.setAttribute("aria-pressed", String(selected));
  });
}

function updateGradeLabels() {
  document.querySelector("#profile-grade").textContent = gradeSelect.value;
  document.querySelector("#welcome-grade").textContent = gradeLongName(gradeSelect.value);
}

function startQuiz() {
  const stage = stageForGrade(gradeSelect.value);
  const subject = subjectsByStage[stage].find((item) => item.id === subjectSelect.value);
  const bank = questions[stage][subject.id];
  activeSubject = subject;
  activeQuestions = bank.map((question) => ({ ...question, options: [...question.options] }));
  questionIndex = 0;
  correctAnswers = 0;
  activeHistoryEntry = null;
  quizNext.dataset.result = "false";
  quizSubject.textContent = `${gradeLongName(gradeSelect.value)} · ${subject.name}`;
  renderQuestion();
  quizDialog.showModal();
}

function renderQuestion() {
  answered = false;
  const question = activeQuestions[questionIndex];
  quizCount.textContent = `QUESTION ${questionIndex + 1} / ${activeQuestions.length}`;
  quizTitle.textContent = question.prompt;
  quizProgressFill.style.width = `${(questionIndex / activeQuestions.length) * 100}%`;
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";
  quizNext.disabled = true;
  quizNext.textContent = "こたえをえらんでね";
  quizOptions.replaceChildren(...question.options.map((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(index));
    return button;
  }));
}

function chooseAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  const question = activeQuestions[questionIndex];
  const isCorrect = selectedIndex === question.answer;
  if (isCorrect) correctAnswers += 1;
  recordAnswer(isCorrect);
  quizOptions.querySelectorAll(".quiz-option").forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add("correct");
    else if (index === selectedIndex) button.classList.add("incorrect");
  });
  quizFeedback.textContent = `${isCorrect ? "せいかい！" : "おしい！"} ${question.explanation}`;
  quizFeedback.classList.add(isCorrect ? "good" : "bad");
  quizNext.disabled = false;
  quizNext.textContent = questionIndex === activeQuestions.length - 1 ? "結果をみる" : "次の問題へ";
}

function recordAnswer(isCorrect) {
  const now = new Date();
  if (!activeHistoryEntry) {
    activeHistoryEntry = {
      completedAt: now.toISOString(),
      grade: gradeSelect.value,
      subject: activeSubject.name,
      icon: activeSubject.icon,
      color: activeSubject.color,
      correct: 0,
      answered: 0,
      total: activeQuestions.length,
    };
    stats.sessions += 1;
    stats.history.unshift(activeHistoryEntry);
  }

  activeHistoryEntry.completedAt = now.toISOString();
  activeHistoryEntry.answered += 1;
  if (isCorrect) {
    activeHistoryEntry.correct += 1;
    stats.correct += 1;
  }

  const dateParts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now).reduce((parts, part) => {
    if (part.type !== "literal") parts[part.type] = part.value;
    return parts;
  }, {});
  const todayKey = `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
  if (!stats.studyDates.includes(todayKey)) stats.studyDates.push(todayKey);
  stats.history = stats.history.slice(0, 50);
  saveStats();
  updateStats();
}

function showResult() {
  const percent = Math.round((correctAnswers / activeQuestions.length) * 100);
  quizProgressFill.style.width = "100%";
  quizCount.textContent = "TODAY'S RESULT";
  quizOptions.replaceChildren();
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";
  quizTitle.innerHTML = "";
  const result = document.createElement("div");
  result.className = "quiz-result";
  const emoji = document.createElement("div");
  emoji.className = "quiz-result-emoji";
  emoji.textContent = percent === 100 ? "🏆" : percent >= 60 ? "🎉" : "🌱";
  const title = document.createElement("h2");
  title.textContent = `${activeQuestions.length}問中 ${correctAnswers}問正解！`;
  const message = document.createElement("p");
  message.textContent = percent === 100 ? "すばらしい！ぜんぶ正解だよ。" : percent >= 60 ? "いい調子！この調子で続けよう。" : "チャレンジしたことがえらい！解説をふりかえってみよう。";
  result.append(emoji, title, message);
  quizTitle.append(result);

  quizNext.disabled = false;
  quizNext.textContent = "ホームにもどる";
  quizNext.dataset.result = "true";
}

function renderPage(view) {
  const page = ["home", "subjects", "progress"].includes(view) ? view : "home";
  const isHistory = page === "progress";
  document.querySelector("#dashboard-view").hidden = isHistory;
  document.querySelector("#progress").hidden = !isHistory;
  document.querySelectorAll(".nav-link[data-view]").forEach((link) => {
    const isActive = link.dataset.view === page || (page === "subjects" && link.dataset.view === "subjects");
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (isHistory) renderHistory();
  window.scrollTo(0, 0);
  if (page === "subjects") {
    requestAnimationFrame(() => document.querySelector("#subjects").scrollIntoView({ behavior: "smooth", block: "start" }));
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-view]");
  if (!link) return;
  event.preventDefault();
  const page = link.dataset.view;
  if (location.hash === `#${page}`) renderPage(page);
  else location.hash = page;
});
window.addEventListener("hashchange", () => renderPage(location.hash.slice(1)));

gradeSelect.addEventListener("change", () => {
  updateGradeLabels();
  renderSubjects();
});
subjectSelect.addEventListener("change", syncSubjectCards);
document.querySelector("#start-button").addEventListener("click", startQuiz);
document.querySelector(".profile-button").addEventListener("click", () => gradeSelect.focus());
document.querySelector("#close-quiz").addEventListener("click", () => quizDialog.close());
quizDialog.addEventListener("click", (event) => {
  if (event.target === quizDialog) quizDialog.close();
});
quizNext.addEventListener("click", () => {
  if (quizNext.dataset.result === "true") {
    quizNext.dataset.result = "false";
    quizDialog.close();
    return;
  }
  if (!answered) return;
  if (questionIndex < activeQuestions.length - 1) {
    questionIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
});

updateGradeLabels();
renderSubjects();
updateStats();
renderPage(location.hash.slice(1));
