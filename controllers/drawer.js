const Drawer = require('./../models/drawer');

exports.writeDrawer = (req, res) => {

    const drawer = new Drawer({
        name: req.body.name,
        type: req.body.type,
        emptySlot: req.body.emptySlot ? req.body.emptySlot : undefined,
        isFull: false
    });

    drawer.save()
        .then(result => {
            res.status(201).json({ id: result._id, drawer });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
};

exports.updateDrawer = (req, res) => {

    const drawer = new Drawer({
        _id: req.params.id,
        name: req.body.name,
        type: req.body.type,
        emptySlot: req.body.emptySlot ? req.body.emptySlot : undefined,
        isFull: req.body.isFull ? req.body.isFull : undefined
      });
    
      Drawer.updateOne({ _id: req.params.id }, drawer)
        .then(result => {
          if (result.n > 0) {
            res.status(200).json(drawer);
            return
          } else {
            res.status(401).json({ message: "Tiroir non trouvé" });
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

exports.takeSlot = (req, res) => {

    const slot = req.body.slot;
    const drawerName = req.body.name;

    var drawerQuery = Drawer.find({ 'name': drawerName });

    let fetchedDrawers;

    drawerQuery
        .then(documents => {
            fetchedDrawers = [...documents];
            return documents.length;
        })
        .then(count => {

            if(count != 1)
            {
                res.status(500).json({
                    message: "Tiroir non trouvé de façon unique"
                })
                return
            }

            fetchedDrawers[0].emptySlot = fetchedDrawers[0].emptySlot.filter(e => e != slot);
            let updatedDrawer = new Drawer({
                _id: fetchedDrawers[0]._id,
                name: fetchedDrawers[0].name,
                type: fetchedDrawers[0].type,
                emptySlot: fetchedDrawers[0].emptySlot,
                isFull: fetchedDrawers[0].emptySlot.length == 0
            });

            Drawer.updateOne({ _id: fetchedDrawers[0]._id }, updatedDrawer)
                .then(result => {
                    if (result.n > 0) {
                        res.status(200).json(updatedDrawer);
                        return
                    } else {
                        res.status(401).json({ message: "Tiroir non trouvé" });
                        return
                    }
                })
                .catch(error => {
                    res.status(500).json({
                        message: error
                    })
                    return
                });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
};

exports.freeSlot = (req, res) => {

    const slot = req.body.slot;
    const drawerName = req.body.name;

    var drawerQuery = Drawer.find({ 'name': drawerName });

    let fetchedDrawers;

    drawerQuery
        .then(documents => {
            fetchedDrawers = [...documents];
            return documents.length;
        })
        .then(count => {

            if(count != 1) res.status(500).json({
                message: "Tiroir non trouvé de façon unique"
            })

            fetchedDrawers[0].emptySlot.push(slot);
            let updatedDrawer = new Drawer({
                _id: fetchedDrawers[0]._id,
                name: fetchedDrawers[0].name,
                type: fetchedDrawers[0].type,
                emptySlot: fetchedDrawers[0].emptySlot,
                isFull: fetchedDrawers[0].emptySlot.length == 0
            });

            Drawer.updateOne({ _id: fetchedDrawers[0]._id }, updatedDrawer)
            .then(result => {
            if (result.n > 0) {
                res.status(200).json(updatedDrawer);
                return
            } else {
                res.status(401).json({ message: "Tiroir non trouvé" });
                return
            }
            })
            .catch(error => {
            res.status(500).json({
                message: error
            })
            return
            });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
};

exports.getDrawerByType = (req, res) => {

    const typeName = req.query.type;

    var drawerQuery;
    if (typeName) {
        drawerQuery = Drawer.find({ 'type': typeName });
    } else {
        drawerQuery = Drawer.find();
    }

    let fetchedDrawers;

    drawerQuery
        .then(documents => {
            fetchedDrawers = [...documents];
            return documents.length;
        })
        .then(count => {
            res.status(200).json({ Colors: fetchedDrawers, maxColors: count });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
};

exports.getDrawerByName = (req, res) => {

    const name = req.query.nom;

    var drawerQuery = Drawer.find({ 'name': { "$regex": name, "$options": "i" } });

    let fetchedDrawers;

    drawerQuery
        .then(documents => {
            fetchedDrawers = [...documents];
            return documents.length;
        })
        .then(count => {
            res.status(200).json({ Drawers: fetchedDrawers, maxDrawer: count });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
};

exports.getDrawerByType = (req, res) => {

    var drawerQuery = Drawer.find({ 'type': req.query.type });

    let fetchedDrawers;

    drawerQuery
        .then(documents => {
            fetchedDrawers = [...documents];
            return documents.length;
        })
        .then(count => {
            res.status(200).json({ Drawers: fetchedDrawers, maxDrawer: count });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
};

exports.getDrawers = (req, res) => {

    let fetchedDrawers;

    const drawerQuery = Drawer.find();

    drawerQuery
        .then(documents => {
            fetchedDrawers = [...documents];
            return documents.length;
        })
        .then(count => {
            res.status(200).json({ Drawers: fetchedDrawers, maxDrawers: count });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
};

exports.getDrawerNotFull = (req, res) => {

    let fetchedDrawers;

    const drawerQuery = Drawer.find({ 'isFull': false});

    drawerQuery
        .then(documents => {
            fetchedDrawers = [...documents];
            return documents.length;
        })
        .then(count => {
            res.status(200).json({ Drawers: fetchedDrawers, maxDrawers: count });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
};

exports.deleteDrawer = (req, res) => {

    Drawer.deleteOne({ _id: req.params.id })
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
