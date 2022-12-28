const Instruction = require('./../models/instruction');

exports.getInstructions = (req, res) => {

  const figurineID = req.query.figurineID;

  const instructionQuery = Instruction.find({ 'figurineID': figurineID });

  let fetchedInstructions;

  instructionQuery
    .then(documents => {
      fetchedInstructions = [...documents];
      return documents.length;
    })
    .then(count => {
      res.status(200).json({ Instructions: fetchedInstructions, maxInstructions: count });
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
};

exports.getInstruction = (req, res) => {

  Instruction.findById(req.params.id)
    .then(instruction => {
      if (instruction) {
        res.status(200).json(instruction);
      } else {
        res.status(404).json({ message: "Mauvais ID" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
};

exports.updateInstruction = (req, res) => {

  const instruction = new Instruction({
    _id: req.params.id,
    name: req.body.name,
    content: req.body.content,
    figurineID: req.body.figurineID,
    paintID: req.body.paintID,
    step: req.body.step
  });

  Instruction.updateOne({ _id: req.params.id }, instruction)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json(instruction);
        return
      } else {
        res.status(401).json({ message: "Pas d'autorisation" });
        return
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
      return
    });
};

exports.writeInstruction = (req, res) => {

  const instruction = new Instruction({
    name: req.body.name,
    content: req.body.content,
    paintID: req.body.paintID,
    figurineID: req.body.figurineID,
    step: req.body.step
  });

  instruction.save()
    .then(result => {
      res.status(201).json({ id: result._id, instruction });
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
}

exports.deleteInstruction = (req, res) => {

  Instruction.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json(result);
      } else {
        res.status(401).json(result);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
};
