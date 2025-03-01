export const submitQuiz = async(req, res) => {
   const { userId, answers } = req.body; // answers = [{ questionId: 1, selectedOption: "A" }, ...]

   // Get correct answers from the database
   const sql = "SELECT id, correct_answer FROM questions WHERE id IN (?)";
   const questionIds = answers.map(a => a.questionId);

   db.query(sql, [questionIds], (err, results) => {
       if (err) return res.status(500).json({ error: err.message });

       // Calculate score
       let score = 0;
       results.forEach((q) => {
           const userAnswer = answers.find(a => a.questionId === q.id);
           if (userAnswer && userAnswer.selectedOption === q.correct_answer) {
               score += 1; // +1 for each correct answer
           }
       });

       // Save score in the database
       const saveScoreSql = "INSERT INTO scores (user_id, score, total_questions) VALUES (?, ?, ?)";
       db.query(saveScoreSql, [userId, score, answers.length], (err) => {
           if (err) return res.status(500).json({ error: err.message });
           res.json({ message: "Quiz submitted!", score, totalQuestions: answers.length });
       });
   });
}