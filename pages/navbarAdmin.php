<nav class="navbar navbar-expand-xl navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Paws to Care</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item-active">
                <a class="nav-link" href="index.php">Home<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="about.php">About us</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="contact.php">Contact us</a>
            </li>
            <?php 
            session_start();
            if (isset($_SESSION['id'])) {
                if ($_SESSION["admin"]) {
                    echo '<li class="nav-item-active dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Animals</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="dogs.php">Dogs</a>
                            <a class="dropdown-item" href="cats.php">Cats</a>
                            <a class="dropdown-item" href="exotic.php">Exotics</a>
                        </div>
                        <li>
                            <a class="nav-link" href="owners.php">Owners</a>
                        </li>
                    </li>';
                }
                else {
                    echo '<li>
                            <a class="nav-link" href="pets.php">Pets</a>
                        </li>';
                }
            }
            ?>
        </ul>

        <ul class="nav navbar-nav visible-xl">
            <li class="pull-right" style="padding-right: 50px; padding-top:10px;">
                <p class="text-info text-center"><span class="font-weight-bold">Phone Number:</span> 801-648-5452 <span class="font-weight-bold">| Address:</span> 432 Dog Way, Provo UT</p>
            </li>
            <li class="pull-right" style="padding-top:5px;">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginModal">Login</button>
            </li>
        </ul>
    </div>
</nav>

<!-- Login Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Login</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <form method="post" action="login.php">
                <div class="form-group">
                    <label for="loginInputUsername">Username</label>
                    <input type="text" name="username" class="form-control" id="loginInputUsername" aria-describedby="usernameHelp" placeholder="Enter username">
                </div>
                <div class="form-group">
                    <label for="loginInputPassword">Password</label>
                    <input type="password" name="password" class="form-control" id="loginInputPassword" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>