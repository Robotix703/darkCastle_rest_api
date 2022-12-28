const Color = require('./../models/color');

exports.writeColor = (req, res) => {

  const color = new Color({
    name: req.body.name,
    gamme: req.body.gamme,
    type: req.body.type,
    colorCode: req.body.colorCode,
    drawerName: req.body.drawerName? req.body.drawerName : "",
    positionX: req.body.positionX? req.body.positionX : 0,
    positionY: req.body.positionY? req.body.positionY : 0,
    toBuy: req.body.toBuy
  });

  color.save()
    .then(result => {
      res.status(201).json({ id: result._id, color });
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
}

exports.updateColor = (req, res) => {

  const color = new Color({
    _id: req.params.id,
    name: req.body.name,
    gamme: req.body.gamme,
    type: req.body.type,
    colorCode: req.body.colorCode,
    drawerName: req.body.drawerName,
    positionX: req.body.positionX,
    positionY: req.body.positionY,
    toBuy: req.body.toBuy
  });

  Color.updateOne({ _id: req.params.id }, color)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json(color);
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
}

exports.updateToBuy = (req, res) => {

  const id = req.body.id;
  const toBuy = req.body.toBuy;

  Color.findOne({ _id: id }, function (err, doc){
    doc.toBuy = toBuy;
    doc.save();
    res.status(200).json(doc);
  })
  .catch(error => {
    res.status(500).json({
      message: error
    })
    return
  });;
}

exports.getColorsFiltre = (req, res) => {

  const gammeName = req.query.gamme;
  const typeName = req.query.type;
  const toBuy = req.query.toBuy;

  const limit = req.query.limit;

  let filters = {};
  if(gammeName)         filters.gamme = gammeName;
  if(typeName)          filters.type = typeName;
  if(toBuy == "true")   filters.toBuy = toBuy;

  let colorQuery = Color.find(filters);

  let fetchedColors;

  colorQuery
    .then(documents => {
      fetchedColors = [...documents];
      if(limit && limit != -1) fetchedColors = fetchedColors.slice(0, limit);
      return documents.length;
    })
    .then(count => {
      res.status(200).json({ Colors: fetchedColors, maxColors: count });
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
};

exports.getColorByName = (req, res) => {

  const name = req.query.nom;

  let colorQuery = Color.find({ 'name': { "$regex": name, "$options": "i" } });

  let fetchedColors;

  colorQuery
    .then(documents => {
      fetchedColors = [...documents];
      return documents.length;
    })
    .then(count => {
      res.status(200).json({ Colors: fetchedColors, maxColors: count });
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
};

exports.getColorsFromDrawer = (req, res) => {

  const drawerName = req.query.drawerName;

  let colorQuery = Color.find({ 'drawerName': drawerName });

  let fetchedColors;

  colorQuery
    .then(documents => {
      fetchedColors = [...documents];
      return documents.length;
    })
    .then(count => {
      res.status(200).json({ Colors: fetchedColors, maxColors: count });
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
};

exports.getColors = (req, res) => {

  const limit = req.query.limit;

  let fetchedColors;

  const colorQuery = Color.find();

  colorQuery
    .then(documents => {
      fetchedColors = [...documents];
      if(limit && limit != -1) fetchedColors = fetchedColors.slice(0, limit);
      return documents.length;
    })
    .then(count => {
      res.status(200).json({ Colors: fetchedColors, maxColors: count });
    })
    .catch(error => {
      res.status(500).json({
        message: error
      })
    });
};

exports.deleteColor = (req, res) => {

  Color.deleteOne({ _id: req.params.id })
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
