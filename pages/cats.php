<!doctype html>
<html lang="en">
  <!-- Homepage content -->
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/style.css">

    <title>Paws to Care | Cats</title>
  </head>
  <body>
    <!-- Navigation bar -->
    <?php include('navbarAdmin.php'); ?>

    <div class="container">
        <!-- content here -->
        <h2 class="text-center">Cats</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col" class="clickable" id="nameHeader" title="The name of the animal given by the owner"><input class="form-control form-control-sm" type="text" placeholder="Filter"> <br> Name</th>
                    <th scope="col" class="clickable" id="speciesHeader" title="The breed of the animal specified by the owner (verified on first visit)."><input class="form-control form-control-sm" type="text" placeholder="Filter"> <br> Breed</th>
                    <th scope="col" class="clickable" id="sexHeader" title="The sex of the animal (verified on first visit).">Sex</th>
                    <th scope="col" title="Indicates whether or not the animal is up to date on shots.">Shots</th>
                    <th scope="col" class="clickable" id="ageHeader" title="The age indicated by the animal's owner. If unknown, a best guess is given.">Age</th>
                    <th scope="col" title="Indicates whether the cat has been declawed by our practice or another.">Declawed</th>
                    <th scope="col" title="Indicates whether or not the animal has been spayed/neutered.">Neutered</th>
                    <th scope="col" class="clickable" id="ownerHeader" title="Indicates the name of the owner(s) as specified on the animals intake sheet."><input class="form-control form-control-sm" type="text" placeholder="Filter"> <br> Owner(s)</th>
                    <th scope="col" class="clickable" id="noteHeader"title="Any notes we have left while the animal has been seen in our practice."><input class="form-control form-control-sm" type="text" placeholder="Filter"> <br> Notes</th>
                </tr>
            </thead>
            <tbody id="catTable">
                <!--TODO: Replace with actual data via javascript -->
                <tr>
                    <th>Toby</th>
                    <td>British Shorthair</td>
                    <td>Male</td>
                    <td>Yes</td>
                    <td>4</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>James Morris</td>
                    <td>Lipsum</td>
                </tr>
                <tr>
                    <th>Lulu</td>
                    <td>Persian</td>
                    <td>Female</td>
                    <td>Yes</td>
                    <td>1</td>
                    <td>Yes</td>
                    <td>No</td>
                    <td>Trevor Miller</td>
                    <td>Lipsum</td>
                </tr>
                <tr>
                    <th>Rascal</th>
                    <td>Siamese</td>
                    <td>Male</td>
                    <td>Yes</td>
                    <td>8</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Branson Linde</td>
                    <td>Lipsum</td>
                </tr>
            </tbody>
        </table>

        <hr>

        <footer>
            <p>&copy; Paws to Care 2018</p>
        </footer>
    </div>

    <div class="modal fade" id="ownerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      This hasn't been implemented yet, but will show details about the owner!
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="modal fade" id="noteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          This hasn't been implemented yet, but will show details about the notes!
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
    <script src="../js/cats.js"></script>
  </body>
</html>