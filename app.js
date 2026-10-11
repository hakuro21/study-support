const gradeSelect = document.querySelector("#grade-select");
const subjectSelect = document.querySelector("#subject-select");
const unitSelect = document.querySelector("#unit-select");
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
    { id: "life", name: "生活", description: "身近な人や自然を知ろう", icon: "🌱", color: "science" },
    { id: "science", name: "理科", description: "ふしぎを見つけよう", icon: "🔬", color: "science" },
    { id: "social", name: "社会", description: "くらしや地図を知ろう", icon: "🗺️", color: "social" },
    { id: "english", name: "英語", description: "身近な英語にふれよう", icon: "🔤", color: "english" },
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

const subjectsByGrade = {
  小1: ["math", "japanese", "life"],
  小2: ["math", "japanese", "life"],
  小3: ["math", "japanese", "science", "social"],
  小4: ["math", "japanese", "science", "social"],
  小5: ["math", "japanese", "science", "social", "english"],
  小6: ["math", "japanese", "science", "social", "english"],
  中1: ["math", "japanese", "english", "science", "social"],
  中2: ["math", "japanese", "english", "science", "social"],
  中3: ["math", "japanese", "english", "science", "social"],
  高1: ["math", "japanese", "english", "physics", "science"],
  高2: ["math", "japanese", "english", "physics", "science"],
  高3: ["math", "japanese", "english", "physics", "science"],
};

const questions = {
  elementary: {
    math: [
      { unit: "わり算", prompt: "36 ÷ 4 はいくつ？", options: ["8", "9", "10", "12"], answer: 1, explanation: "4 × 9 = 36 だから、36 ÷ 4 = 9 だね。" },
      { unit: "長方形と正方形", prompt: "1辺が5cmの正方形のまわりの長さは？", options: ["10cm", "15cm", "20cm", "25cm"], answer: 2, explanation: "正方形は4辺が同じ長さ。5 × 4 = 20cmだよ。" },
      { unit: "小数のたし算", prompt: "0.7 + 0.8 はいくつ？", options: ["1.3", "1.4", "1.5", "1.6"], answer: 2, explanation: "小数点の位置をそろえて計算すると、0.7 + 0.8 = 1.5。" },
    ],
    japanese: [
      { unit: "反対の意味の言葉", prompt: "「美しい」の反対の意味に近い言葉はどれ？", options: ["きれい", "うつくしい", "みにくい", "あざやか"], answer: 2, explanation: "「みにくい」は「美しい」と反対の意味を表す言葉だよ。" },
      { unit: "主語と述語", prompt: "「鳥が空を飛ぶ。」の主語はどれ？", options: ["鳥が", "空を", "飛ぶ", "空"], answer: 0, explanation: "「だれが・何が」にあたる「鳥が」が主語だね。" },
      { unit: "ていねいな言い方", prompt: "「走る」をていねいな言い方にすると？", options: ["走った", "走ります", "走ろう", "走れば"], answer: 1, explanation: "「走ります」は「走る」をていねいにした言い方だよ。" },
    ],
    science: [
      { unit: "植物のはたらき", prompt: "植物が日光を受けて、葉で養分をつくるはたらきは？", options: ["呼吸", "発芽", "光合成", "蒸発"], answer: 2, explanation: "植物は日光を使って、葉で養分をつくる。これを光合成というよ。" },
      { unit: "水のすがた", prompt: "水がこおり始める温度は何度？", options: ["0℃", "10℃", "50℃", "100℃"], answer: 0, explanation: "水はふつう、0℃でこおり始めるよ。" },
      { unit: "磁石のせいしつ", prompt: "磁石に引きつけられるものはどれ？", options: ["木のつくえ", "鉄のくぎ", "紙のノート", "ガラスのコップ"], answer: 1, explanation: "鉄は磁石に引きつけられる金属だよ。" },
    ],
    social: [
      { unit: "都道府県", prompt: "日本の都道府県の数はいくつ？", options: ["43", "45", "47", "50"], answer: 2, explanation: "日本には1都1道2府43県、合わせて47の都道府県があるよ。" },
      { unit: "地図の見方", prompt: "地図で、ふつう上の方が表す方角は？", options: ["東", "西", "南", "北"], answer: 3, explanation: "地図は上が北、下が南を表すことが多いよ。" },
      { unit: "日本の地形", prompt: "日本でいちばん高い山はどれ？", options: ["北岳", "富士山", "奥穂高岳", "槍ヶ岳"], answer: 1, explanation: "富士山は標高3,776mで、日本でいちばん高い山だよ。" },
    ],
    life: [
      { unit: "安全な登下校", prompt: "通学路を歩くとき、安全のために気をつけることは？", options: ["左右をたしかめて歩く", "車道の真ん中を歩く", "信号を見ない", "走って道路をわたる"], answer: 0, explanation: "道路をわたるときは左右をたしかめ、安全を確認しよう。" },
      { unit: "植物のせわ", prompt: "植物を育てるとき、土がかわいていたら何をする？", options: ["水をあげる", "土をける", "葉をとる", "箱にしまう"], answer: 0, explanation: "植物が育つように、土の様子を見て水をあげよう。" },
      { unit: "学校の道具", prompt: "学校で使った道具を次の人も使えるようにするには？", options: ["もとの場所に片づける", "床に置く", "持ち帰る", "かくす"], answer: 0, explanation: "道具をもとの場所に片づけると、みんなが使いやすいね。" },
    ],
    english: [
      { unit: "身近なものの英語", prompt: "「りんご」を表す英語はどれ？", options: ["apple", "book", "dog", "blue"], answer: 0, explanation: "appleは「りんご」という意味だよ。" },
      { unit: "あいさつ", prompt: "「こんにちは」とあいさつするときに使う英語は？", options: ["Hello.", "Good night.", "Thank you.", "Goodbye."], answer: 0, explanation: "Helloは、出会ったときのあいさつだよ。" },
      { unit: "be動詞", prompt: "「私はユキです」を表す英文は？", options: ["I am Yuki.", "I is Yuki.", "You am Yuki.", "I are Yuki."], answer: 0, explanation: "主語がIのときはbe動詞amを使うよ。" },
    ],
  },
  middle: {
    math: [
      { unit: "方程式", prompt: "方程式 3x + 5 = 20 の x はいくつ？", options: ["3", "5", "8", "15"], answer: 1, explanation: "両辺から5を引いて3x=15。両辺を3で割るとx=5だよ。" },
      { unit: "円の面積", prompt: "半径3cmの円の面積は？（円周率はπ）", options: ["3π cm²", "6π cm²", "9π cm²", "12π cm²"], answer: 2, explanation: "円の面積は半径×半径×π。3×3×π=9π cm²だよ。" },
      { unit: "確率", prompt: "サイコロを1回振るとき、偶数が出る確率は？", options: ["1/6", "1/3", "1/2", "2/3"], answer: 2, explanation: "偶数は2・4・6の3つ。全部で6通りだから3/6=1/2だよ。" },
    ],
    japanese: [
      { unit: "接続語", prompt: "「しかし」は、文と文をどのようにつなぐ接続語？", options: ["理由", "逆接", "例示", "追加"], answer: 1, explanation: "「しかし」は、前の内容と反対の内容をつなぐ逆接の接続語だよ。" },
      { unit: "古典の読み", prompt: "「古典」の読み方はどれ？", options: ["こてん", "ふるてん", "こでん", "ふるのり"], answer: 0, explanation: "「古典」は「こてん」と読むよ。" },
      { unit: "比喩表現", prompt: "「彼はまるで太陽のように明るい」は何の表現？", options: ["擬人法", "比喩（直喩）", "倒置法", "反復法"], answer: 1, explanation: "「まるで〜のように」とたとえているので、直喩だね。" },
    ],
    english: [
      { unit: "一般動詞", prompt: "「私は毎日テニスをします」を表す英文は？", options: ["I play tennis every day.", "I plays tennis every day.", "I am play tennis every day.", "I playing tennis every day."], answer: 0, explanation: "主語がIの現在形では動詞はplay。every dayは「毎日」だよ。" },
      { unit: "場所を表す単語", prompt: "「図書館」を意味する英単語はどれ？", options: ["museum", "library", "station", "kitchen"], answer: 1, explanation: "libraryは「図書館」という意味だよ。" },
      { unit: "現在進行形", prompt: "They (　) watching a movie now. に入る語は？", options: ["is", "am", "are", "be"], answer: 2, explanation: "主語がTheyなので、be動詞はare。現在進行形はare watchingだよ。" },
    ],
    science: [
      { unit: "電流", prompt: "電流の単位はどれ？", options: ["ボルト（V）", "アンペア（A）", "オーム（Ω）", "ワット（W）"], answer: 1, explanation: "電流の単位はアンペア（A）。電圧はボルト、抵抗はオームだよ。" },
      { unit: "水溶液の性質", prompt: "酸性の水溶液に青色リトマス紙をつけると？", options: ["赤色になる", "青色のまま", "白色になる", "緑色になる"], answer: 0, explanation: "酸性の水溶液に青色リトマス紙をつけると赤色に変わるよ。" },
      { unit: "地球と太陽", prompt: "地球が太陽のまわりを1周するのにかかる時間は？", options: ["約1日", "約1か月", "約1年", "約10年"], answer: 2, explanation: "地球は約1年かけて太陽のまわりを1周するよ。" },
    ],
    social: [
      { unit: "日本国憲法", prompt: "日本国憲法が施行された年は？", options: ["1889年", "1945年", "1947年", "1952年"], answer: 2, explanation: "日本国憲法は1946年に公布され、1947年5月3日に施行されたよ。" },
      { unit: "世界の気候", prompt: "赤道に近い地域に広がる気候帯は？", options: ["寒帯", "温帯", "乾燥帯", "熱帯"], answer: 3, explanation: "赤道付近は一年を通して気温が高く、熱帯に分類されるよ。" },
      { unit: "日本の政治", prompt: "日本の国会をつくる2つの議院は？", options: ["上院と下院", "衆議院と参議院", "国民院と政府院", "県議会と市議会"], answer: 1, explanation: "日本の国会は、衆議院と参議院の二院制だよ。" },
    ],
  },
  high: {
    math: [
      { unit: "微分", prompt: "関数 y = 2x² を x で微分すると？", options: ["2x", "4x", "x²", "4x²"], answer: 1, explanation: "べき乗の微分より、(2x²)' = 2 × 2x = 4xだよ。" },
      { unit: "対数", prompt: "log₂ 8 の値は？", options: ["2", "3", "4", "8"], answer: 1, explanation: "2³=8なので、log₂ 8=3だよ。" },
      { unit: "等差数列", prompt: "初項2、公差3の等差数列の第5項は？", options: ["11", "12", "14", "17"], answer: 2, explanation: "第5項は2 + (5−1)×3 = 14だよ。" },
    ],
    english: [
      { unit: "現在完了", prompt: "空欄に入る語は？ I have lived here (　) 2020.", options: ["for", "since", "during", "by"], answer: 1, explanation: "sinceは「〜以来」。2020のような始まった時点と使うよ。" },
      { unit: "環境に関する語彙", prompt: "「環境」を意味する英単語はどれ？", options: ["environment", "government", "development", "movement"], answer: 0, explanation: "environmentは「環境」という意味だよ。" },
      { unit: "受け身", prompt: "The book (　) by many students. に入る語は？", options: ["read", "reads", "is read", "is reading"], answer: 2, explanation: "「本が読まれる」という受け身の文なので、is readが入るよ。" },
    ],
    physics: [
      { unit: "運動方程式", prompt: "質量2kgの物体に、加速度3m/s²を生じさせる力は？", options: ["1.5N", "5N", "6N", "9N"], answer: 2, explanation: "運動方程式 F=ma より、2×3=6Nだよ。" },
      { unit: "オームの法則", prompt: "電圧12V、抵抗4Ωの回路に流れる電流は？", options: ["0.3A", "3A", "8A", "48A"], answer: 1, explanation: "オームの法則 I=V/R より、12÷4=3Aだよ。" },
      { unit: "波の性質", prompt: "波の速さを表す式はどれ？（振動数f、波長λ）", options: ["v = fλ", "v = f/λ", "v = λ/f", "v = f + λ"], answer: 0, explanation: "波の速さは、振動数×波長で v=fλ と表せるよ。" },
    ],
    japanese: [
      { unit: "語彙と意味", prompt: "「杞憂」の意味として正しいものは？", options: ["思いがけない幸運", "必要のない心配", "強い決意", "昔の思い出"], answer: 1, explanation: "杞憂は、心配する必要のないことをあれこれ心配することだよ。" },
      { unit: "比喩表現", prompt: "「山のように積まれた本」は何の表現？", options: ["直喩", "隠喩", "擬人法", "倒置法"], answer: 0, explanation: "「山のように」と「ように」を使ってたとえる直喩だよ。" },
      { unit: "文章の要旨", prompt: "文章の中で、筆者の主張を支える具体例の役割は？", options: ["主張を分かりやすくする", "題名を説明する", "段落数を増やす", "結論を隠す"], answer: 0, explanation: "具体例は、主張の内容を読者に分かりやすく伝える助けになるよ。" },
    ],
    science: [
      { unit: "水の化学式", prompt: "水の化学式はどれ？", options: ["CO₂", "O₂", "H₂O", "NaCl"], answer: 2, explanation: "水は水素原子2つと酸素原子1つからできていて、化学式はH₂Oだよ。" },
      { unit: "原子のつくり", prompt: "原子核を構成する粒子の組み合わせは？", options: ["陽子と中性子", "陽子と電子", "電子と中性子", "電子だけ"], answer: 0, explanation: "原子核は、正の電荷をもつ陽子と電荷をもたない中性子からできているよ。" },
      { unit: "中和", prompt: "酸と塩基が反応して水と塩ができる反応は？", options: ["酸化", "中和", "分解", "重合"], answer: 1, explanation: "酸と塩基が反応して互いの性質を打ち消し、水と塩を生じる反応を中和というよ。" },
    ],
  },
};

const gradeQuestion = (unit, prompt, options, answer, explanation) => ({
  unit, prompt, options, answer, explanation,
});

const gradeQuestions = {
  小1: {
    math: gradeQuestion("10までのかず", "どんぐりが7こあります。3こもらうと、ぜんぶで何こ？", ["9こ", "10こ", "11こ", "12こ"], 1, "7に3をたすと10だよ。"),
    japanese: gradeQuestion("ひらがな", "「ねこ」の最初の文字はどれ？", ["ぬ", "ね", "の", "れ"], 1, "「ねこ」は「ね」から始まることばだよ。"),
    life: gradeQuestion("学校のくらし", "学校で本を借りたり読んだりする場所は？", ["理科室", "図書室", "校庭", "保健室"], 1, "本を読む場所は図書室だね。"),
  },
  小2: {
    math: gradeQuestion("かけ算", "おさらが4まいあり、りんごがそれぞれ3こずつあります。りんごは何こ？", ["7こ", "12こ", "14こ", "43こ"], 1, "3こずつ4つ分なので、3×4=12こだよ。"),
    japanese: gradeQuestion("主語と述語", "「犬が公園を走る。」の述語はどれ？", ["犬が", "公園を", "走る", "公園"], 2, "「どうする」にあたる「走る」が述語だよ。"),
    life: gradeQuestion("生きもののようす", "チューリップの花がさく季節は？", ["春", "夏", "秋", "冬"], 0, "チューリップは春に花がさくよ。"),
  },
  小3: {
    math: gradeQuestion("わり算", "24このあめを6人で同じ数ずつ分けると、1人分は？", ["3こ", "4こ", "5こ", "6こ"], 1, "24÷6=4で、1人分は4こだよ。"),
    japanese: gradeQuestion("段落", "文章を内容のまとまりごとに分けたものを何という？", ["段落", "句点", "主語", "題名"], 0, "文章のまとまりを段落というよ。"),
    science: gradeQuestion("植物の育ち", "ホウセンカの種が発芽するために必要なものは？", ["水", "砂糖", "日光だけ", "肥料だけ"], 0, "種は発芽するときに水が必要だよ。"),
    social: gradeQuestion("地図記号", "地図で、寺を表す記号はどれ？", ["卍", "〒", "♨", "◎"], 0, "地図では「卍」が寺を表す記号だよ。"),
  },
  小4: {
    math: gradeQuestion("小数のわり算", "3.6÷4はいくつ？", ["0.09", "0.9", "9", "14.4"], 1, "36÷4=9をもとにすると、3.6÷4=0.9だよ。"),
    japanese: gradeQuestion("漢字の組み立て", "「休」は「人」と何を組み合わせた漢字？", ["木", "日", "口", "山"], 0, "「休」は人が木のそばで休む様子からできた漢字だよ。"),
    science: gradeQuestion("電気のはたらき", "乾電池2個を直列につなぐと、1個のときより豆電球はどうなる？", ["明るくなる", "暗くなる", "必ず消える", "変わらない"], 0, "直列につなぐと回路に加わる電圧が大きくなり、明るくなるよ。"),
    social: gradeQuestion("都道府県", "日本でいちばん北にある都道府県は？", ["青森県", "北海道", "岩手県", "秋田県"], 1, "日本の最北にある都道府県は北海道だよ。"),
  },
  小5: {
    math: gradeQuestion("異分母の分数", "1/2 + 1/3 はいくつ？", ["2/5", "5/6", "1/6", "1"], 1, "分母を6にそろえると3/6+2/6=5/6だよ。"),
    japanese: gradeQuestion("敬語", "「先生が言う」を敬語で表すと？", ["先生がおっしゃる", "先生が申す", "先生がうかがう", "先生がいただく"], 0, "相手を敬う言い方は「おっしゃる」だよ。"),
    science: gradeQuestion("植物の発芽と成長", "植物が発芽したあと、よく成長するために必要なものは？", ["水・空気・適した温度", "砂糖・塩", "暗さだけ", "土だけ"], 0, "発芽には水・空気・適した温度が必要だよ。"),
    social: gradeQuestion("日本の農業", "日本で、あたたかい地域を中心にさかんな米づくりは？", ["稲作", "酪農", "養蚕", "林業"], 0, "米を育てる農業を稲作というよ。"),
    english: gradeQuestion("身近な英語", "「私はサッカーが好きです」に合う英文は？", ["I like soccer.", "I likes soccer.", "I am soccer.", "I liking soccer."], 0, "主語がIのときは動詞の原形likeを使うよ。"),
  },
  小6: {
    math: gradeQuestion("分数のかけ算", "2/3 × 3/4 はいくつ？", ["1/2", "5/7", "6/7", "1"], 0, "分子どうし、分母どうしをかけると6/12=1/2だよ。"),
    japanese: gradeQuestion("漢字の成り立ち", "「森林」の「森」は、何という成り立ちの漢字？", ["象形文字", "会意文字", "形声文字", "仮名"], 1, "「木」を三つ組み合わせて意味を表す会意文字だよ。"),
    science: gradeQuestion("水よう液の性質", "青色リトマス紙を赤色に変える水よう液は？", ["酸性", "中性", "アルカリ性", "純水"], 0, "酸性の水よう液は青色リトマス紙を赤色に変えるよ。"),
    social: gradeQuestion("日本の歴史", "聖徳太子が定めたとされる、役人の心構えを示したものは？", ["十七条の憲法", "大宝律令", "武家諸法度", "五箇条の御誓文"], 0, "聖徳太子は十七条の憲法を定めたとされているよ。"),
    english: gradeQuestion("過去のこと", "「私は昨日、図書館へ行きました」に合う英文は？", ["I go to the library yesterday.", "I went to the library yesterday.", "I am going yesterday.", "I goes yesterday."], 1, "yesterdayがあるので、goの過去形wentを使うよ。"),
  },
  中1: {
    math: gradeQuestion("正負の数", "−3 + 8 はいくつ？", ["−11", "−5", "5", "11"], 2, "−3から正の向きに8進むと5だよ。"),
    japanese: gradeQuestion("文の成分", "「妹が本を読む。」の主語はどれ？", ["妹が", "本を", "読む", "本"], 0, "「だれが」にあたる「妹が」が主語だよ。"),
    english: gradeQuestion("一般動詞", "空欄に入る語は？ I (　) music every day.", ["likes", "like", "am like", "liking"], 1, "主語がIの現在形では動詞の原形likeを使うよ。"),
    science: gradeQuestion("植物の分類", "種子をつくらず、胞子でふえる植物は？", ["アブラナ", "ゼニゴケ", "マツ", "エンドウ"], 1, "ゼニゴケは胞子でふえるコケ植物だよ。"),
    social: gradeQuestion("世界の地域構成", "赤道が通る大陸はどれ？", ["南アメリカ大陸", "ヨーロッパ大陸", "南極大陸", "オーストラリア大陸"], 0, "赤道は南アメリカ大陸を通っているよ。"),
  },
  中2: {
    math: gradeQuestion("連立方程式", "x+y=7、x−y=1 のとき、xはいくつ？", ["3", "4", "6", "7"], 1, "2つの式を足すと2x=8なので、x=4だよ。"),
    japanese: gradeQuestion("用言の活用", "「走った」のもとの形（終止形）はどれ？", ["走る", "走り", "走れ", "走ろう"], 0, "「走った」のもとの形は「走る」だよ。"),
    english: gradeQuestion("不定詞", "「私は本を読むために図書館へ行った」に合う表現は？", ["to read a book", "read a book", "reading a book", "reads a book"], 0, "目的「〜するために」は to + 動詞の原形で表せるよ。"),
    science: gradeQuestion("化学変化", "鉄と硫黄を加熱してできる物質は？", ["硫化鉄", "酸化鉄", "水", "塩化鉄"], 0, "鉄と硫黄が化合して硫化鉄ができるよ。"),
    social: gradeQuestion("日本の気候", "冬に日本海側で雪が多くなる主な理由は？", ["季節風が日本海で水蒸気を含むため", "赤道に近いため", "海流がないため", "台風が毎日来るため"], 0, "冬の季節風が日本海で水蒸気を含み、山地に雪を降らせるよ。"),
  },
  中3: {
    math: gradeQuestion("平方根", "√49 の値は？", ["−7", "7", "14", "49"], 1, "2乗すると49になる正の数は7だよ。"),
    japanese: gradeQuestion("慣用句", "「頭を抱える」の意味はどれ？", ["悩む", "喜ぶ", "眠る", "急ぐ"], 0, "「頭を抱える」は、困って悩むことを表すよ。"),
    english: gradeQuestion("現在完了", "空欄に入る語は？ I have (　) this book for two years.", ["have", "had", "has", "having"], 1, "have + 過去分詞で継続を表し、haveの過去分詞はhadだよ。"),
    science: gradeQuestion("遺伝", "親の形質が子に伝わることを何という？", ["遺伝", "蒸留", "分解", "発酵"], 0, "親から子へ形質が伝わることを遺伝というよ。"),
    social: gradeQuestion("公民・基本的人権", "日本国憲法で、すべての人に保障される権利を何という？", ["基本的人権", "参政権だけ", "納税の義務", "裁判員制度"], 0, "日本国憲法は基本的人権を保障しているよ。"),
  },
  高1: {
    math: gradeQuestion("数学I・二次関数", "y=x²−4x+3 の軸は？", ["x=−2", "x=−1", "x=2", "x=4"], 2, "平方完成すると y=(x−2)²−1。軸はx=2だよ。"),
    japanese: gradeQuestion("現代文・論理展開", "筆者の主張を見つけるとき、まず注目するものは？", ["結論を示す表現", "段落の文字数", "漢字の画数", "句読点の数"], 0, "「つまり」「したがって」など結論を示す表現が手がかりになるよ。"),
    english: gradeQuestion("英語コミュニケーションI・時制", "空欄に入る語は？ She (　) to school every day.", ["go", "goes", "going", "gone"], 1, "三人称単数の主語Sheには、現在形の動詞にsをつけるよ。"),
    physics: gradeQuestion("物理基礎・速度", "100mを20秒で進んだときの平均の速さは？", ["2m/s", "5m/s", "20m/s", "2000m/s"], 1, "平均の速さは距離÷時間。100÷20=5m/sだよ。"),
    science: gradeQuestion("化学基礎・物質量", "水H₂O 1分子に含まれる水素原子は何個？", ["1個", "2個", "3個", "4個"], 1, "化学式H₂Oの下付きの2は水素原子が2個という意味だよ。"),
  },
  高2: {
    math: gradeQuestion("数学II・微分", "f(x)=x²+3x の導関数は？", ["x+3", "2x+3", "2x", "x²+3"], 1, "x²を微分すると2x、3xを微分すると3だよ。"),
    japanese: gradeQuestion("古典・助動詞", "古文の助動詞「む」が表す意味として代表的なものは？", ["推量・意志", "完了だけ", "打消だけ", "受身だけ"], 0, "「む」は文脈により推量や意志などを表すよ。"),
    english: gradeQuestion("英語・関係代名詞", "空欄に入る語は？ The book (　) I bought is interesting.", ["who", "which", "where", "when"], 1, "先行詞が物なので、関係代名詞whichを使えるよ。"),
    physics: gradeQuestion("物理・運動方程式", "質量3kgの物体に2m/s²の加速度を与える力は？", ["1.5N", "5N", "6N", "9N"], 2, "F=maより、3×2=6Nだよ。"),
    science: gradeQuestion("化学・酸と塩基", "水溶液中で水素イオンを生じる物質は？", ["酸", "塩基", "金属", "中性物質"], 0, "酸は水溶液中で水素イオンを生じる物質だよ。"),
  },
  高3: {
    math: gradeQuestion("数学III・積分", "∫₀¹ 2x dx の値は？", ["0", "1", "2", "4"], 1, "[x²]₀¹=1−0=1だよ。"),
    japanese: gradeQuestion("現代文・要旨", "文章の要旨をまとめるときに大切なことは？", ["中心となる主張と理由を押さえる", "例だけを並べる", "本文をそのまま全部写す", "題名だけを書く"], 0, "要旨では、中心となる主張とそれを支える理由を整理するよ。"),
    english: gradeQuestion("英語・仮定法", "空欄に入る語は？ If I (　) rich, I would travel the world.", ["am", "were", "will be", "have been"], 1, "現在の事実に反する仮定では、be動詞にwereを使う形が基本だよ。"),
    physics: gradeQuestion("物理・エネルギー保存", "摩擦や空気抵抗を無視するとき、力学的エネルギーはどうなる？", ["保存される", "必ず0になる", "常に増える", "熱だけになる"], 0, "保存力だけがはたらくとき、力学的エネルギーは保存されるよ。"),
    science: gradeQuestion("化学・酸化還元", "電子を失う変化を何という？", ["酸化", "還元", "中和", "電離"], 0, "電子を失う変化を酸化、受け取る変化を還元というよ。"),
  },
};

function greatestCommonDivisor(left, right) {
  return right === 0 ? left : greatestCommonDivisor(right, left % right);
}

function formatFraction(numerator, denominator) {
  const divisor = greatestCommonDivisor(numerator, denominator);
  const reducedNumerator = numerator / divisor;
  const reducedDenominator = denominator / divisor;
  return reducedDenominator === 1 ? String(reducedNumerator) : `${reducedNumerator}/${reducedDenominator}`;
}

function generatedQuestion(unit, prompt, answer, distractors, explanation) {
  const options = [...new Set([String(answer), ...distractors.map(String)])].slice(0, 4);
  if (options.length !== 4) throw new Error(`選択肢が不足しています: ${unit} - ${prompt}`);
  return { unit, prompt, options, answer: 0, explanation };
}

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function makeSixthGradeMathQuestions() {
  const banks = {
    "分数のかけ算・わり算": [],
    "比と比例・反比例": [],
    "速さ・単位量あたりの大きさ": [],
    "円の面積・体積": [],
    "拡大図・縮図と対称な図形": [],
    "データの活用": [],
  };

  for (let index = 0; index < 30; index += 1) {
    const firstNumerator = 2 + (index % 7);
    const firstDenominator = 3 + (index % 5);
    const secondNumerator = 2 + ((index * 3) % 7);
    const secondDenominator = 2 + ((index * 2) % 7);
    const isDivision = index % 2 === 1;
    const resultNumerator = isDivision
      ? firstNumerator * secondDenominator
      : firstNumerator * secondNumerator;
    const resultDenominator = isDivision
      ? firstDenominator * secondNumerator
      : firstDenominator * secondDenominator;
    const answer = formatFraction(resultNumerator, resultDenominator);
    const unit = banks["分数のかけ算・わり算"];
    unit.push(generatedQuestion(
      "分数のかけ算・わり算",
      `${firstNumerator}/${firstDenominator} ${isDivision ? "÷" : "×"} ${secondNumerator}/${secondDenominator} を計算しよう。`,
      answer,
      [
        formatFraction(resultNumerator + resultDenominator, resultDenominator),
        formatFraction(resultNumerator + resultDenominator * 2, resultDenominator),
        formatFraction(resultNumerator + resultDenominator * 3, resultDenominator),
      ],
      isDivision
        ? `わり算は、わる数の逆数をかけます。答えは ${answer} です。`
        : `分子どうし、分母どうしをかけて約分します。答えは ${answer} です。`,
    ));

    const scale = 2 + index;
    const ratioLeft = 2 + (index % 5);
    const ratioRight = 3 + ((index * 2) % 6);
    const firstValue = ratioLeft * scale;
    const directValue = ratioRight * scale;
    const inverseValue = scale * ratioRight * 2;
    const ratioPrompt = index % 3;
    const ratioQuestion = ratioPrompt === 0
      ? `xとyの比は${ratioLeft}:${ratioRight}です。x=${firstValue + ratioLeft}のとき、yはいくつ？`
      : ratioPrompt === 1
        ? `x:y=${ratioLeft}:${ratioRight}のとき、x=${firstValue}ならyはいくつ？`
        : `xとyは反比例し、x=${scale}のときy=${inverseValue / scale}です。x=${scale * 2}のとき、yはいくつ？`;
    const computedRatioAnswer = ratioPrompt === 0
      ? directValue + ratioRight
      : ratioPrompt === 1
        ? directValue
        : inverseValue / (scale * 2);
    banks["比と比例・反比例"].push(generatedQuestion(
      "比と比例・反比例",
      ratioQuestion,
      computedRatioAnswer,
      [computedRatioAnswer + 1, computedRatioAnswer + 2, computedRatioAnswer + 3],
      ratioPrompt === 2
        ? "反比例では、xとyの積が一定です。"
        : "比例では、xが同じ倍率で変わるとyも同じ倍率で変わります。",
    ));

    const seconds = 20 + index * 2;
    const speed = 2 + Math.floor(index / 10);
    const distance = speed * seconds;
    banks["速さ・単位量あたりの大きさ"].push(generatedQuestion(
      "速さ・単位量あたりの大きさ",
      `${distance}mを${seconds}秒で進みました。速さは毎秒何m？`,
      `${speed}m/秒`,
      [`${speed + 1}m/秒`, `${speed + 2}m/秒`, `${speed + 3}m/秒`],
      `速さは、道のりを時間でわって求めます。${distance} ÷ ${seconds} = ${speed}m/秒です。`,
    ));

    const radius = 2 + index;
    const length = 3 + index;
    const width = 2 + ((index * 2) % 7);
    const height = 2 + ((index * 3) % 6);
    const geometryType = index % 2;
    const geometryAnswer = geometryType === 0 ? `${radius * radius}π cm²` : `${length * width * height} cm³`;
    const geometryPrompt = geometryType === 0
      ? `半径${radius}cmの円の面積を、円周率πを使って表そう。`
      : `たて${length}cm、横${width}cm、高さ${height}cmの直方体の体積は？`;
    banks["円の面積・体積"].push(generatedQuestion(
      "円の面積・体積",
      geometryPrompt,
      geometryAnswer,
      geometryType === 0
        ? [`${(radius + 2) ** 2}π cm²`, `${Math.max(1, radius - 1) ** 2}π cm²`, `${radius * radius + radius}π cm²`]
        : [`${length * width} cm³`, `${length + width + height} cm³`, `${length * width * height + 5} cm³`],
      geometryType === 0
        ? "円の面積は、半径×半径×円周率で求めます。"
        : "直方体の体積は、たて×横×高さで求めます。",
    ));

    const drawingScale = 2 + index;
    const drawingLength = 3 + index;
    const shapeNames = ["正方形", "長方形", "正三角形", "正六角形", "ひし形"];
    const symmetryCounts = [4, 2, 3, 6, 2];
    const rotationalOrders = [4, 2, 3, 6, 2];
    const vertexCounts = [4, 4, 3, 6, 4];
    const shapeIndex = index % shapeNames.length;
    const scaleOrSymmetry = index % 2 === 0;
    const symmetryQuestionType = Math.floor(index / 10);
    const symmetryPrompt = symmetryQuestionType === 0
      ? `線対称な${shapeNames[shapeIndex]}の対称の軸は何本？`
      : symmetryQuestionType === 1
        ? `${shapeNames[shapeIndex]}は、1回転するまでに何回重なる？`
        : `${shapeNames[shapeIndex]}の頂点は何個？`;
    const symmetryAnswer = symmetryQuestionType === 0
      ? symmetryCounts[shapeIndex]
      : symmetryQuestionType === 1
        ? rotationalOrders[shapeIndex]
        : vertexCounts[shapeIndex];
    const geometryScaleAnswer = `${drawingLength * drawingScale}cm`;
    banks["拡大図・縮図と対称な図形"].push(generatedQuestion(
      "拡大図・縮図と対称な図形",
      scaleOrSymmetry
        ? `縮尺1:${drawingScale}の図で、長さ${drawingLength}cmの辺は実際には何cm？`
        : symmetryPrompt,
      scaleOrSymmetry ? geometryScaleAnswer : symmetryAnswer,
      scaleOrSymmetry
        ? [`${drawingLength * drawingScale + 1}cm`, `${drawingLength * drawingScale + 2}cm`, `${drawingLength * drawingScale + 3}cm`]
        : [symmetryAnswer + 1, Math.max(0, symmetryAnswer - 1), symmetryAnswer + 2],
      scaleOrSymmetry
        ? `実際の長さは、図の長さに縮尺の分母をかけます。${drawingLength} × ${drawingScale} = ${drawingLength * drawingScale}cmです。`
        : `${symmetryPrompt.replace(/[？?]$/, "")} ${symmetryAnswer}です。`,
    ));

    const dataValues = [
      3 + (index % 9),
      8 + (index % 7),
      12 + (index % 5),
      17 + (index % 6),
      22 + (index % 8),
    ].sort((left, right) => left - right);
    const dataType = index % 3;
    const dataAnswer = dataType === 0
      ? dataValues.reduce((sum, value) => sum + value, 0) / dataValues.length
      : dataType === 1
        ? dataValues[2]
        : dataValues[dataValues.length - 1] - dataValues[0];
    const dataName = dataType === 0 ? "平均値" : dataType === 1 ? "中央値" : "範囲";
    banks["データの活用"].push(generatedQuestion(
      "データの活用",
      `次のデータの${dataName}はいくつ？ ${dataValues.join("、")}`,
      dataAnswer,
      [dataAnswer + 2, Math.max(0, dataAnswer - 2), dataAnswer + 5],
      dataType === 0
        ? "平均値は、すべての値の合計を個数でわって求めます。"
        : dataType === 1
          ? "中央値は、値を小さい順に並べたときの中央の値です。"
          : "範囲は、最大値から最小値をひいて求めます。",
    ));
  }

  return banks;
}

const customQuestionBanks = {
  小6: {
    math: makeSixthGradeMathQuestions(),
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
let activeUnit = null;
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
        unit: typeof entry.unit === "string" ? entry.unit : "",
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
    subject.textContent = `${entry.grade} · ${entry.subject}${entry.unit ? ` · ${entry.unit}` : ""}`;
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
  const subjects = subjectsByStage[stage].filter((subject) => subjectsByGrade[gradeSelect.value].includes(subject.id));
  const previous = subjectSelect.value;
  subjectSelect.replaceChildren(...subjects.map((subject) => {
    const option = document.createElement("option");
    option.value = subject.id;
    option.textContent = subject.name;
    return option;
  }));
  subjectSelect.value = subjects.some((subject) => subject.id === previous) ? previous : subjects[0].id;
  renderUnits();
  subjectGrid.replaceChildren(...subjects.map((subject) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `subject-card ${subject.color}${subject.id === subjectSelect.value ? " selected" : ""}`;
    card.dataset.subject = subject.id;
    card.setAttribute("aria-pressed", String(subject.id === subjectSelect.value));

    const tag = document.createElement("span");
    tag.className = "subject-tag";
    tag.textContent = "単元別";
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
      renderUnits();
    });
    return card;
  }));
}

function renderUnits() {
  const stage = stageForGrade(gradeSelect.value);
  const customBank = customQuestionBanks[gradeSelect.value]?.[subjectSelect.value];
  const gradeQuestionForSubject = gradeQuestions[gradeSelect.value][subjectSelect.value];
  const availableQuestions = customBank
    ? Object.values(customBank).flat()
    : [gradeQuestionForSubject, ...questions[stage][subjectSelect.value]];
  const units = customBank
    ? Object.keys(customBank)
    : [...new Set(availableQuestions.map((question) => question.unit))];
  const previous = unitSelect.value;
  unitSelect.replaceChildren(...units.map((unit) => {
    const option = document.createElement("option");
    option.value = unit;
    option.textContent = unit;
    return option;
  }));
  unitSelect.value = units.includes(previous) ? previous : units[0];
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
  activeUnit = unitSelect.value;
  const customBank = customQuestionBanks[gradeSelect.value]?.[subject.id];
  if (customBank) {
    activeQuestions = [...customBank[activeUnit]];
  } else {
    const gradeQuestionForSubject = gradeQuestions[gradeSelect.value][subject.id];
    activeQuestions = [gradeQuestionForSubject, ...bank]
      .filter((question) => question.unit === activeUnit);
  }
  activeQuestions = shuffled(activeQuestions).slice(0, 3).map((question) => {
    const options = shuffled(question.options.map((option, index) => ({
      option,
      correct: index === question.answer,
    })));
    return {
      ...question,
      options: options.map(({ option }) => option),
      answer: options.findIndex(({ correct }) => correct),
    };
  });
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
  document.querySelector("#quiz-unit").textContent = question.unit;
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
      unit: activeUnit,
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
subjectSelect.addEventListener("change", () => {
  syncSubjectCards();
  renderUnits();
});
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
