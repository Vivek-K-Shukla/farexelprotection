<?php
/**
 * Vehicles listing entry point. Serves the existing static vehicles.html until a dynamic page is wired.
 */
$static = __DIR__ . DIRECTORY_SEPARATOR . 'vehicles.html';
if (!is_readable($static)) {
	http_response_code(404);
	header('Content-Type: text/plain; charset=UTF-8');
	echo 'vehicles.html not found.';
	exit;
}
readfile($static);
